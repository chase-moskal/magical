
import {Trace} from "./parsing/ordinary/types.js"

export class CamelCssError extends Error {
	name = this.constructor.name
	constructor(public trace: Trace, message: string) {
		super(`(${trace.cursor.line}:${trace.cursor.column}) ${message}`)
	}
}

export class CamelCssMissingSelectorError extends CamelCssError {
	constructor(trace: Trace) {
		super(trace, `expression is missing selector`)
	}
}

export class CamelCssStackError extends CamelCssError {
	constructor(trace: Trace) {
		super(trace, `unexpected closing brace "}"`)
	}
}

export class CamelCssRuleNamePlacementError extends CamelCssError {
	constructor(trace: Trace, ruleName: string) {
		super(trace, `invalid place for rule name "${ruleName}"`)
	}
}

export class CamelCssRuleValuePlacementError extends CamelCssError {
	constructor(trace: Trace, ruleValue: string) {
		super(trace, `invalid place for rule value "${ruleValue}"`)
	}
}
