
import {Token} from "./types.js"
import {lexers} from "./lexers.js"

export function tokenize(source: string): Token.Any[] {
	const tokens: Token.Any[] = []
	let done = false
	let lastIndex = 0

	while (!done) {
		let token: undefined | Token.Any

		for (const lexer of Object.values(lexers)) {
			let result = lexer(source, lastIndex)
			if (result) {
				token = result.token
				lastIndex = result.lastIndex
				break
			}
		}

		if (token)
			tokens.push(token)
		else
			done = true
	}

	return tokens
}
