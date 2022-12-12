
import {StateSetter} from "../../view/types.js"

export type StateReturns<xValue> = [
	xValue,
	StateSetter<xValue>,
	() => xValue
]
