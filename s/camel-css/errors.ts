
export class CamelCssError extends Error {
	name = this.constructor.name
}

export class CamelCssMissingSelectorError extends CamelCssError {
	constructor() {
		super(`expression is missing selector`)
	}
}

export class CamelCssStackError extends CamelCssError {
	constructor() {
		super(`unexpected closing brace "}"`)
	}
}

export class CamelCssRuleNamePlacementError extends CamelCssError {
	constructor(ruleName: string) {
		super(`invalid place for rule name "${ruleName}"`)
	}
}

export class CamelCssRuleValuePlacementError extends CamelCssError {
	constructor(ruleValue: string) {
		super(`invalid place for rule value "${ruleValue}"`)
	}
}
