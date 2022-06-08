
import {Lexer, Token} from "./types.js"

export const lexers: {[key: string]: Lexer} = {

	selector: (source, lastIndex) => {
		const regex = /([^{}}]+)(?={)/my
		regex.lastIndex = lastIndex
		const result = regex.exec(source)
		if (result) {
			const [,value] = result
			return {
				lastIndex: regex.lastIndex,
				token: <Token.Selector>{
					type: Token.Type.Selector,
					value: value.trim(),
				},
			}
		}
		else
			return undefined
	},

	open: (source, lastIndex) => {
		const regex = /\s*{/my
		regex.lastIndex = lastIndex
		const result = regex.exec(source)
		if (result) {
			return {
				lastIndex: regex.lastIndex,
				token: <Token.Open>{
					type: Token.Type.Open,
				},
			}
		}
		else
			return undefined
	},

	close: (source, lastIndex) => {
		const regex = /\s*}/my
		regex.lastIndex = lastIndex
		const result = regex.exec(source)
		if (result) {
			return {
				lastIndex: regex.lastIndex,
				token: <Token.Close>{
					type: Token.Type.Close,
				},
			}
		}
		else
			return undefined
	},

	ruleName: (source, lastIndex) => {
		const regex = /\s*([\S]+):/my
		regex.lastIndex = lastIndex
		const result = regex.exec(source)
		if (result) {
			const [,value] = result
			return {
				lastIndex: regex.lastIndex,
				token: <Token.RuleName>{
					type: Token.Type.RuleName,
					value: value.trim(),
				},
			}
		}
		else
			return undefined
	},

	ruleValue: (source, lastIndex) => {
		const regex = /\s*([^;}]*)[;}]/my
		regex.lastIndex = lastIndex
		const result = regex.exec(source)
		if (result) {
			const [,value] = result
			return {
				lastIndex: regex.lastIndex,
				token: <Token.RuleValue>{
					type: Token.Type.RuleValue,
					value: value.trim(),
				},
			}
		}
		else
			return undefined
	},
}
