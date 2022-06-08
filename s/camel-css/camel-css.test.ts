
import {Suite, expect, assert} from "cynic"
import {parseOrdinary, Token, tokenize} from "./parsing/parse-ordinary.js"

const source = `
	header {
		h1 {
			color: red;
		}
	}
`

export default <Suite>{
	"parse ordinary syntax": {
		// async "parse returns an array"() {
		// 	const result = parseOrdinary(source)
		// 	assert(Array.isArray(result), "result must be an array")
		// },
		async "tokenizer returns a token"() {
			const tokens = tokenize(source)
			for (const token of tokens.map(token => ({
				...token,
				type: Token.Type[token.type],
			})))
				console.log(token)
			expect(tokens.length).equals(8)
		},
	},
}
