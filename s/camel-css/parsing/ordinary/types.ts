

export type Lexer = (source: string, lastIndex: number) =>
	undefined | {token: Token.Any, lastIndex: number}

export namespace Token {

	export enum Type {
		Selector,
		Open,
		Close,
		RuleName,
		RuleValue,
	}

	export interface Base {
		type: Type
	}

	export interface Selector extends Base {
		type: Type.Selector
		value: string
	}

	export interface Open extends Base {
		type: Type.Open
	}

	export interface Close extends Base {
		type: Type.Close
	}

	export interface RuleName extends Base {
		type: Type.RuleName
		value: string
	}

	export interface RuleValue extends Base {
		type: Type.RuleValue
		value: string
	}

	export type Any = (
		| Selector
		| Open
		| Close
		| RuleName
		| RuleValue
	)
}
