
import {Token} from "./types.js"
import {Expression} from "../../types.js"
import {CamelCssMissingClosingBraceError, setupTracedErrors} from "../../errors.js"

export function parse(tokens: Token.Any[]): Expression[] {
	const expressions: Expression[] = []

	type StackFrame = {
		selector: undefined | string
		ruleName: undefined | string
		rules: {[key: string]: string}
		childFrames: StackFrame[]
	}

	let frame: undefined | StackFrame
	const stack: StackFrame[] = []

	for (const token of tokens) {
		const error = setupTracedErrors(token.trace)
		switch (token.type) {

			case Token.Type.Selector: {
				frame = {
					selector: token.value,
					ruleName: undefined,
					rules: {},
					childFrames: [],
				}
				stack.push(frame)
			} break

			case Token.Type.Open: {} break

			case Token.Type.RuleName: {
				if (!frame)
					throw error.ruleNamePlacement(token.value)
				frame.ruleName = token.value
			} break

			case Token.Type.RuleValue: {
				if (!frame || !frame.ruleName)
					throw error.ruleValuePlacement(token.value)
				frame.rules[frame.ruleName] = token.value
				frame.ruleName = undefined
			} break

			case Token.Type.Close: {
				const completedFrame = stack.pop()
				const parentFrame = stack.length > 0
					? stack[stack.length - 1]
					: undefined
				frame = parentFrame

				if (!completedFrame)
					throw error.excessClosingBrace()

				if (!completedFrame.selector)
					throw error.missingSelector()

				if (parentFrame)
					parentFrame.childFrames.push(completedFrame)
				else {
					function recursiveFrameToExpression(frame: StackFrame): Expression {
						return [
							frame.selector!,
							frame.rules,
							frame.childFrames.map(recursiveFrameToExpression),
						]
					}
					expressions.push(recursiveFrameToExpression(completedFrame))
				}
			} break
		}
	}

	if (stack.length > 0)
		throw new CamelCssMissingClosingBraceError(stack.length)

	return expressions
}
