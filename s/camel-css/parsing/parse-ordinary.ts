
import {Expression} from "../types.js"

export function parseOrdinary(source: string): Expression[] {
	const tokens = tokenize(source)
	const expressions: Expression[] = []
	return expressions
}

// const regexes = {
// 	selector: /((?:[^{]|\n)+)*/m,
// 	open: /{/m,
// 	close: /}/m,
// 	ruleName: /([\S])+(?=:)/m,
// 	ruleValue: /:[^;}]*/m,
// }

type Lexer = (source: string, lastIndex: number) =>
	undefined | {token: Token.Any, lastIndex: number}

const lexers: {[key: string]: Lexer} = {
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

		console.log("token!", token)

		if (token)
			tokens.push(token)
		else
			done = true
	}

	return tokens
}

export namespace Token {
	export enum Type {
		Selector,
		Open,
		Close,
		RuleName,
		RuleValue,
	}
	export interface Base { type: Type }
	export interface Selector extends Base { type: Type.Selector; value: string }
	export interface Open extends Base { type: Type.Open }
	export interface Close extends Base { type: Type.Close }
	export interface RuleName extends Base { type: Type.RuleName; value: string }
	export interface RuleValue extends Base { type: Type.RuleValue; value: string }
	export type Any = (
		| Selector
		| Open
		| Close
		| RuleName
		| RuleValue
	)
}
