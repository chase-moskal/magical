import {LitElement} from "lit"
import {Elem} from "../../elem.js"
import {StateReturns} from "./state-returns.js"


export interface UseElement<xProps extends {}> extends Elem {
	element: LitElement & xProps

	state<xValue>(
		initial: xValue | ((element: LitElement & xProps) => xValue)
	): StateReturns<xValue>

	setup(
		initializer: (element: LitElement & xProps) => (void | (() => void))
	): void
}
