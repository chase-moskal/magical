
import {Token} from "./types.js"
import {makeLexer} from "./utils/make-lexer.js"

export const lexers = {

	open: makeLexer<Token.Open>(
		/(\s*)([^{};]+){/my,
		(match, makeTrace) => {
			const [, preamble, selector] = match
			const trimmedSelector = selector.trim()
			return {
				type: Token.Type.Open,
				trace: makeTrace(preamble, trimmedSelector.length),
				selector: selector.trim(),
			}
		},
	),

	close: makeLexer<Token.Close>(
		/(\s*)}/my,
		(match, makeTrace) => {
			const [, preamble] = match
			return {
				type: Token.Type.Close,
				trace: makeTrace(preamble),
			}
		},
	),

	ruleName: makeLexer<Token.RuleName>(
		/(\s*)([\S]+):/my,
		(match, makeTrace) => {
			const [, preamble, name] = match
			const trimmedName = name.trim()
			return {
				name: trimmedName,
				type: Token.Type.RuleName,
				trace: makeTrace(preamble, trimmedName.length),
			}
		}
	),

	ruleValue: makeLexer<Token.RuleValue>(
		/(\s*)([^;}]+)(;|(?=}))/my,
		(match, makeTrace) => {
			const [, preamble, value] = match
			const trimmedValue = value.trim()
			return {
				value: trimmedValue,
				type: Token.Type.RuleValue,
				trace: makeTrace(preamble, trimmedValue.length),
			}
		}
	),
}
