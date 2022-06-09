
import {CSSResult, unsafeCSS} from "lit"

import {compile} from "./compilation/compile.js"
import {parse} from "./parsing/ordinary/parse.js"
import {tokenize} from "./parsing/ordinary/tokenize.js"

export function camelCss(input: string) {
	const tokens = tokenize(input)
	const expressions = parse(tokens)
	return compile(expressions)
}

export function css(
		strings: TemplateStringsArray,
		...values: any[]
	): CSSResult {

	const input = Array.from(strings).reduce(
		(previous, current, index) =>
			previous + current + (values[index] ?? ""),
		""
	)

	const output = camelCss(input)
	return unsafeCSS(output)
}
