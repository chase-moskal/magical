
import {Suite, expect} from "cynic"
import {Token} from "./parsing/ordinary/types.js"
import {tokenize} from "./parsing/ordinary/tokenize.js"

const source = `
	header {
		h1 {
			color: red;
		}
	}
`

export default <Suite>{
	"ordinary syntax": {
		"tokenize": {
			async "returns the correct number of tokens"() {
				const tokens = tokenize(source)
				expect(tokens.length).equals(8)
			},
			async "returns the correct tokens"() {
				const correctTokenTypes = [
					Token.Type.Selector,
					Token.Type.Open,
					Token.Type.Selector,
					Token.Type.Open,
					Token.Type.RuleName,
					Token.Type.RuleValue,
					Token.Type.Close,
					Token.Type.Close,
				]
				const tokens = tokenize(source)
				expect(tokens.length).equals(correctTokenTypes.length)
				const correct = correctTokenTypes
					.every((type, index) => tokens[index].type === type)
				expect(correct).ok()
			},
		},
		"parse": {
			async ""() {
				
			},
		},
	},
}
