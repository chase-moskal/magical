
import {Suite, expect} from "cynic"
import {compile} from "./compilation/compile.js"
import {Token} from "./parsing/ordinary/types.js"
import {parse} from "./parsing/ordinary/parse.js"
import {tokenize} from "./parsing/ordinary/tokenize.js"

export default <Suite>{
	"ordinary syntax": {
		"tokenize": {
			async "returns the correct number of tokens"() {
				const tokens = tokenize(`header { h1 { color: red; } }`)
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
				const tokens = tokenize(`header { h1 { color: red; } }`)
				expect(tokens.length).equals(correctTokenTypes.length)
				const correct = correctTokenTypes
					.every((type, index) => tokens[index].type === type)
				expect(correct).ok()
			},
			async "returns good tokens for complex source"() {
				const tokens = tokenize(`
					header {
						background: yellow;
						h1 { color: red; }
					}
				`)
				const correctTokenTypes = [
					Token.Type.Selector,
					Token.Type.Open,
					Token.Type.RuleName,
					Token.Type.RuleValue,
					Token.Type.Selector,
					Token.Type.Open,
					Token.Type.RuleName,
					Token.Type.RuleValue,
					Token.Type.Close,
					Token.Type.Close,
				]
				expect(tokens.length).equals(correctTokenTypes.length)
				const correct = correctTokenTypes
					.every((type, index) => tokens[index].type === type)
				expect(correct).ok()
			},
		},
		"parse": {
			async "flat source code into expressions"() {
				const tokens = tokenize(`
					h1 {
						color: red;
						text-align: center;
					}
					h2 {
						font-style: italic;
					}
				`)
				const expressions = parse(tokens)
				expect(expressions.length).equals(2)
			},
			async "nested source code into nested expressions"() {
				const tokens = tokenize(`header { h1 { color: red; } }`)
				const expressions = parse(tokens)
				expect(expressions.length).equals(1)
				{
					const [expression1] = expressions
					const [selector, rules, children] = expression1
					expect(selector).equals("header")
					expect(Object.keys(rules).length).equals(0)
					expect(children.length).equals(1)
					{
						const [child] = children
						const [selector, rules, children2] = child
						expect(selector).equals("h1")
						expect(Object.keys(rules).length).equals(1)
						expect(children2.length).equals(0)
					}
				}
			},
		},
		"compile": {
			async "nested source code emits proper css"() {
				const tokens = tokenize(`header { h1 { color: red; } }`)
				const expressions = parse(tokens)
				const css = compile(expressions)
				const expectedResult = `header h1 { color: red; }`
				expect(strip(css)).equals(strip(expectedResult))
			},
			async "parent expression can contain rules and children"() {
				const tokens = tokenize(`
					header {
						background: yellow;
						h1 { color: red; }
					}
				`)
				const expressions = parse(tokens)
				const css = compile(expressions)
				const expectedResult = `
					header { background: yellow; }
					header h1 { color: red; }
				`
				expect(strip(css)).equals(strip(expectedResult))
			},
		},
	},
}

function strip(text: string) {
	return text.trim().replaceAll(/\s+/mg, " ")
}
