
import {LitElement} from "lit"
import {Elem} from "../../elem.js"
import {StateTuple} from "../../magical.js"
import {SetupInitializer} from "./setup-initializer.js"

export interface UseElement<E extends LitElement> extends Elem {
	element: E

	state<xValue>(
		initial: xValue | ((element: E) => xValue)
	): StateTuple<xValue>

	setup(
		initializer: SetupInitializer<E>
	): void
}
