
import {Token} from "./types.js"
import {makeLexer} from "./utils/make-lexer.js"

export const lexers = {

	selector: makeLexer<Token.Selector>(
		/(\s*)([^{};]+)(?={)/my,
		(match, makeTrace) => {
			const [, preamble, value] = match
			const trimmedValue = value.trim()
			return {
				value: trimmedValue,
				type: Token.Type.Selector,
				trace: makeTrace(preamble, trimmedValue.length),
			}
		}
	),

	open: makeLexer<Token.Open>(
		/(\s*){/my,
		(match, makeTrace) => {
			const [, preamble] = match
			return {
				type: Token.Type.Open,
				trace: makeTrace(preamble),
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
			const [, preamble, value] = match
			const trimmedValue = value.trim()
			return {
				value: trimmedValue,
				type: Token.Type.RuleName,
				trace: makeTrace(preamble, trimmedValue.length),
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
