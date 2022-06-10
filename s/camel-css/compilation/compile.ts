
import {Expression} from "../types.js"

export function* compile(expressions: Iterable<Expression>) {

	function recurse(expression: Expression, previousSelector: undefined | string): string[] {
		let css: string[] = []
		const [selector, rules, children] = expression

		const compoundSelector = previousSelector
			? `${previousSelector} ${selector}`
			: selector

		const ruleEntries = Object.entries(rules)
		if (ruleEntries.length > 0) {
			const rulesString = ruleEntries
				.map(([ruleName, ruleValue]) => `\t${ruleName}: ${ruleValue};`)
				.join("\n")
			css.push(`${compoundSelector} {\n${rulesString}\n}`)
		}

		for (const child of children)
			css = [...css, ...recurse(child, compoundSelector)]

		return css
	}

	yield "\n"

	for (const expression of expressions)
		yield "\n" + recurse(expression, undefined).join("\n")

	yield "\n"
}
