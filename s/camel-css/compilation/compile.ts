
import {Expression, Rules} from "../types.js"

export function* compile(expressions: Iterable<Expression>) {

	function recurse(
			expression: Expression,
			previousSelector: undefined | string
		): string[] {

		let css: string[] = []
		const selector = expression[0]

		// This is an at-rule, not a regular selector.
		if (selector.startsWith("@")) {
			const directive = expression[0]
			const children  = expression[1] as Expression[]
			css.push(`${stripAwayComments(directive)}`)
			for (const child of children)
				css = [...css, ...recurse(child, undefined)]
			css.push(`}`)
		}

		// This is a regular selector.
		else {
			const rules = expression[1] as Rules
			const children = expression[2] as Expression[]

			const compoundSelector = previousSelector
				? handleParentReference(`${previousSelector} ${selector}`)
				: selector

			const ruleEntries = Object.entries(rules)
			if (ruleEntries.length > 0) {
				const rulesString = ruleEntries
					.map(([ruleName, ruleValue]) =>
						`\t${ruleName}: ${stripAwayComments(ruleValue)};`)
					.join("\n")
				css.push(`${stripAwayComments(compoundSelector)} {\n${rulesString}\n}`)
			}

			for (const child of children)
				css = [...css, ...recurse(child, compoundSelector)]
		}

		return css
	}

	yield "\n"

	for (const expression of expressions)
		yield "\n" + recurse(expression, undefined).join("\n")

	yield "\n"
}

function stripAwayComments(text: string) {
	return text.replaceAll(/(\s*)(\/\/.*)$/gm, "")
}

function handleParentReference(groupedSelector: string) {
	return groupedSelector.replaceAll(/(\s+)*(\^|&)/gm, "")
}

