
import {Elem} from "../elem.js"
import {UseElement} from "./types/use-element.js"
import {SetupInitializer} from "./types/setup-initializer.js"

export const setupUseObjectForElement = <xProps extends {}>({
		elem,
		addSetup,
		rerender,
		getRenderCount,
		incrementStateCount,
	}: {
		elem: Elem
		rerender(): void
		getRenderCount(): number
		incrementStateCount(): number
		addSetup(setup: SetupInitializer<xProps>): void
	}): UseElement<xProps> => {

	const stateMap = new Map<number, any>()

	return {

		element: <any>this,

		...elem,

		setup: initializer => {
			if (getRenderCount() === 0)
				addSetup(initializer)
		},

		state: initial => {
			const currentCount = incrementStateCount()

			let currentValue: any
			const alreadySet = stateMap.has(currentCount)

			if (alreadySet)
				currentValue = stateMap.get(currentCount)

			else {
				currentValue = (
					(typeof initial === "function")
						? (<any>initial)(this)
						: initial
				)
				stateMap.set(currentCount, currentValue)
			}

			const getter = () => stateMap.get(currentCount)

			return [
				currentValue,
				valueOrFunction => {
					const newValue = (typeof valueOrFunction === "function")
						? (<any>valueOrFunction)(getter())
						: valueOrFunction
					stateMap.set(currentCount, newValue)
					rerender()
				},
				() => stateMap.get(currentCount),
			]
		},
	}
}
