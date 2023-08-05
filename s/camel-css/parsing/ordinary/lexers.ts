
import {Token} from "./types.js"
import {makeLexer} from "./utils/make-lexer.js"

export const lexers = {

	slashSlashComment: makeLexer<Token.SlashSlashComment>(
		/(\/\/.*)$/my,
		(match, makeTrace) => {
			const [, value] = match
			const trimmedValue = value.trim()
			return {
				type: Token.Type.SlashSlashComment,
				trace: makeTrace(trimmedValue.length),
				value: trimmedValue,
			}
		}
	),

	atRule: makeLexer<Token.AtRule>(
		/(@(?:[^;{]+[;]|[^{]+{))/my,
		(match, makeTrace) => {
			const [, directive] = match
			const trimmedDirective = directive.trim()
			return {
				type: Token.Type.AtRule,
				trace: makeTrace(trimmedDirective.length),
				directive: trimmedDirective,
			}
		}
	),

	open: makeLexer<Token.Open>(
		/([^{};]*){/my,
		(match, makeTrace) => {
			const [, selector] = match
			const trimmedSelector = selector.trim()
			return {
				type: Token.Type.Open,
				trace: makeTrace(trimmedSelector.length),
				selector: trimmedSelector,
			}
		},
	),

	close: makeLexer<Token.Close>(
		/}/my,
		(match, makeTrace) => {
			return {
				type: Token.Type.Close,
				trace: makeTrace(1),
			}
		},
	),

	ruleName: makeLexer<Token.RuleName>(
		/([\S]+):/my,
		(match, makeTrace) => {
			const [, name] = match
			const trimmedName = name.trim()
			return {
				type: Token.Type.RuleName,
				trace: makeTrace(trimmedName.length),
				name: trimmedName,
			}
		}
	),

	ruleValue: makeLexer<Token.RuleValue>(
		/([^;}]+)(;|(?=}))/my,
		(match, makeTrace) => {
			const [, value] = match
			const trimmedValue = value.trim()
			return {
				type: Token.Type.RuleValue,
				trace: makeTrace(trimmedValue.length),
				value: trimmedValue,
			}
		}
	),
}
