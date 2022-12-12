
import {LitElement} from "lit"
import {Elem} from "../../elem.js"
import {StateTuple} from "../../magical.js"
import {SetupInitializer} from "./setup-initializer.js"

export interface UseElement<xProps extends {}> extends Elem {
	element: LitElement & xProps

	state<xValue>(
		initial: xValue | ((element: LitElement & xProps) => xValue)
	): StateTuple<xValue>

	setup(
		initializer: SetupInitializer<xProps>
	): void
}
