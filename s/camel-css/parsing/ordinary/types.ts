
export interface Source {
	code: string
}

export interface Cursor {
	index: number
	line: number
	column: number
}

export interface Trace {
	cursor: Cursor
	length: number
}

export type MakeTrace = (preamble: string, valueLength?: number) => Trace

export interface LexerResult<xToken extends Token.Any = Token.Any> {
	token: xToken
	newIndex: number
}

export type Lexer<xToken extends Token.Any> =
	(source: Source, cursor: Cursor) =>
		undefined | LexerResult<xToken>

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
		trace: Trace
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

export function asLexers<xLexers extends {[key: string]: Lexer<Token.Any>}>(
		lexers: xLexers
	) {
	return lexers
}

export function asToken<xToken extends Token.Base>(token: xToken) {
	return token
}
