
import {Token} from "./types.js"
import {Expression} from "../../types.js"

export function parse(tokens: Token.Any[]): Expression[] {
	const expressions: Expression[] = []

	if (tokens.length > 0 && tokens[0].type !== Token.Type.Selector)
		throw new Error("file must start with a selector!")

	let selector: undefined | string
	let ruleName: undefined | string
	let rules: {[key: string]: string} = {}

	for (const token of tokens) {
		switch (token.type) {

			case Token.Type.Selector: {
				selector = token.value
			} break

			case Token.Type.Open: {} break

			case Token.Type.RuleName: {
				ruleName = token.value
			} break

			case Token.Type.RuleValue: {
				if (ruleName)
					rules[ruleName] = token.value
				else
					throw new Error("rule value cannot precede rule name")
				ruleName = undefined
			} break

			case Token.Type.Close: {
				if (!selector)
					throw Error("expression must have a selector!")
				expressions.push([selector, rules, []])
				selector = undefined
				ruleName = undefined
				rules = {}
			} break
		}
	}

	return expressions
}
