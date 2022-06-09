
import {updateCursor} from "./update-cursor.js"
import {Token, MakeTrace, Lexer} from "../types.js"

export function makeLexer<xToken extends Token.Any>(
		regex: RegExp,
		tokenize: (match: RegExpMatchArray, makeTrace: MakeTrace) => Token.Any,
	): Lexer<xToken> {

	return <Lexer<xToken>>((source, cursor) => {
		regex.lastIndex = cursor.index

		const match = regex.exec(source.code)
		if (!match)
			return undefined

		const newIndex = regex.lastIndex
		const makeTrace: MakeTrace = (preamble, valueLength?) => {
			const subcursor = updateCursor(preamble, cursor, cursor.index + preamble.length)
			return {
				cursor: subcursor,
				length: valueLength ?? (newIndex - subcursor.index),
			}
		}

		const token = tokenize(match, makeTrace)
		return {newIndex, token}
	})
}
