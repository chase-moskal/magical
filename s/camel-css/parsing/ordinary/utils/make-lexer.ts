
import {updateCursor} from "./update-cursor.js"
import {Token, MakeTrace, Lexer} from "../types.js"

const whitespacePreambleRegex = /(\s*)/my

export function makeLexer<xToken extends Token.Any>(
		regex: RegExp,
		readToken: (match: RegExpMatchArray, makeTrace: MakeTrace) => Token.Any,
	): Lexer<xToken> {

	return <Lexer<xToken>>((source, cursor) => {
		let index = cursor.index
		let preamble: string

		{
			// match whitespace preamble
			whitespacePreambleRegex.lastIndex = cursor.index
			const [, whitespace = ""] = whitespacePreambleRegex.exec(source.code)
				?? []
			preamble = whitespace
			index = whitespacePreambleRegex.lastIndex
		}

		regex.lastIndex = index

		const match = regex.exec(source.code)
		if (!match)
			return undefined

		index = regex.lastIndex
		const makeTrace: MakeTrace = (valueLength?) => {
			const subcursor = updateCursor(preamble, cursor, cursor.index + preamble.length)
			return {
				cursor: subcursor,
				length: valueLength ?? (index - subcursor.index),
			}
		}

		const token = readToken(match, makeTrace)
		return {newIndex: index, token}
	})
}
