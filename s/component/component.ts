
import {directive} from "lit/directive.js"
import {AsyncDirective} from "lit/async-directive.js"

import {Renderer, Sauce, StateSetter, StateSettingFunction, Use, ValueOrFunction} from "./types.js"
import {debounce} from "../toolbox/debounce/debounce.js"

// TODO
// - detect and forbid infinite loops (setting state in render)
// - accept state setter callback (previousState => newState)
// - figure out optional shadow dom and css attachment
//

export function component<xProps extends any[]>(sauce: Sauce<xProps>) {
	class ComponentDirective extends AsyncDirective {
		#stateMap = new Map<number, [any, any]>() // [currentState, previousState]
		#setupMap = new Map<number, () => void>()

		#generateUse(...props: xProps): Use {
			const stateMap = this.#stateMap
			const setupMap = this.#setupMap
			let stateIndex = 0
			let setupIndex = 0
			const rerender = debounce(0, () => this.setValue(this.render(...props)))
			return {

				state<xValue>(initialValue: xValue) {
					const initialized = stateMap.has(stateIndex)

					if (!initialized)
						stateMap.set(stateIndex, [initialValue, undefined])

					const [currentValue, previousValue] = stateMap.get(stateIndex)!
					let currentIndex = stateIndex

					const set: StateSetter<xValue> = valueOrFunction => {

						const newValue = typeof valueOrFunction === "function"
							? (<StateSettingFunction<xValue>>valueOrFunction)(currentValue)
							: valueOrFunction

						if (newValue !== currentValue) {
							stateMap.set(currentIndex, [newValue, currentValue])
							rerender()
						}
					}

					stateIndex += 1
					return [currentValue, set, currentValue !== previousValue]
				},

				setup(e) {
					const initialized = setupMap.has(setupIndex)

					if (!initialized)
						setupMap.set(setupIndex, e(rerender))

					setupIndex += 1
				},
			}
		}

		disconnected() {
			super.disconnected()

			for (const dispose of this.#setupMap.values())
				dispose()

			this.#setupMap.clear()
			this.#stateMap.clear()
		}

		render(...props: xProps) {
			const use = this.#generateUse(...props)
			const renderer = sauce(use)
			return renderer(...props)
		}
	}

	return <Renderer<xProps>>directive(ComponentDirective)
}
