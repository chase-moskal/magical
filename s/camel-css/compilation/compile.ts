
import {Expression} from "../types.js"

export function compile(expressions: Expression[]) {

	const css: string[] = []

	function recurse(expression: Expression, previousSelector: undefined | string) {
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
			recurse(child, compoundSelector)
	}

	for (const expression of expressions)
		recurse(expression, undefined)

	return "\n" + css.join("\n") + "\n"
}
