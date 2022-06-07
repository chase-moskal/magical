import {css} from "lit"

export interface Rules {
	[key: string]: string
}

export type Expression = [string, Rules, Expression[]]
 //                       ☝️
 //                   css selector

export namespace Token {
	export enum Type {
		Selector,
		Open,
		Close,
		RuleBridge,
		RuleDelimiter,
	}
	export interface Token { type: Type }
	export interface Selector { type: Type.Selector; value: string }
	export interface Open { type: Type.Open }
	export interface Close { type: Type.Close }
	export type Any = (
		| Selector
		| Open
		| Close
	)
}

export function tokenize(source: string): Token.Any[] {
	return []
}

export function parse(tokens: Token.Any[]): Expression[] {
	return []
}

export function compile(expressions: Expression[]): string {
	return ""
}



let camel1 = css`
	header h1 {
		color: red;
	}
`
const tokens1 = [
	{type: "Token.Type.Selector", value: "header h1"},
	{type: "Token.Type.Open"},
	{type: "Token.Type.RuleName", value: "color"},
	{type: "Token.Type.RuleValue", value: "red"},
	{type: "Token.Type.Close"},
]



let camel2 = css`
	header h1:
		color red

		button:hover:
			color yellow
`
const tokens2 = [
	{indents: 1, type: "Token.Type.Selector", value: "header h1"},
	{indents: 2, type: "Token.Type.Rule", value: "color red"},
	{indents: 2, type: "Token.Type.Selector", value: "button:hover"},
	{indents: 3, type: "Token.Type.Rule", value: "color yellow"},
]




