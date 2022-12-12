
import {LitElement} from "lit"

import {Elem} from "../elem.js"
import {StateSetter} from "../view/types.js"
import {UseElement} from "./types/use-element.js"
import {SetupInitializer} from "./types/setup-initializer.js"

export const setupUseObjectForElement = <xProps extends {}>({
		elem,
		element,
		addSetup,
		rerender,
		getRenderCount,
		incrementStateCount,
	}: {
		elem: Elem
		element: LitElement
		rerender(): void
		getRenderCount(): number
		incrementStateCount(): number
		addSetup(setup: SetupInitializer<xProps>): void
	}): UseElement<xProps> => {

	const stateMap = new Map<number, [any, any]>()

	return {
		...elem,
		element: <any>element,

		setup: initializer => {
			if (getRenderCount() === 0)
				addSetup(initializer)
		},

		state: initial => {
			const count = incrementStateCount()
			const alreadySet = stateMap.has(count)

			let currentValue: any
			let previousValue: any

			if (alreadySet)
				[currentValue, previousValue] = stateMap.get(count) ?? []

			else
				stateMap.set(count, [
					currentValue =
						(typeof initial === "function")
							? (<any>initial)(this)
							: initial,
					undefined,
				])

			const setter: StateSetter<any> = valueOrFunction => {
				const previousValue = getter()
				const newValue = (typeof valueOrFunction === "function")
					? (<any>valueOrFunction)(previousValue)
					: valueOrFunction
				stateMap.set(count, [newValue, previousValue])
				rerender()
			}

			const getter = () => (stateMap.get(count) ?? [])[0]

			return [
				currentValue,
				setter,
				getter,
				previousValue,
			]
		},
	}
}
