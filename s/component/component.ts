
import {directive} from "lit/directive.js"
import {AsyncDirective} from "lit/async-directive.js"

import {debounce} from "../toolbox/debounce/debounce.js"
import {createStateSetter} from "./helpers/create-state-setter.js"
import {Renderer, Sauce, SetupMap, StateMap, Use} from "./types.js"
import {initializeAndGetState} from "./helpers/initialize-and-get-state.js"

// TODO
// - detect and forbid infinite loops (setting state in render)
// - figure out optional shadow dom and css attachment
//

export function component<xProps extends any[]>(sauce: Sauce<xProps>) {
	class ComponentDirective extends AsyncDirective {
		#stateMap: StateMap = new Map<number, [any, any]>()
		#setupMap: SetupMap = new Map<number, () => void>()

		#generateUse(...props: xProps): Use {
			const stateMap = this.#stateMap
			const setupMap = this.#setupMap
			let stateIndex = 0
			let setupIndex = 0
			const rerender = debounce(0, () => this.setValue(this.render(...props)))
			return {

				state<xValue>(initialValue: xValue) {
					const [currentValue, previousValue]
						= initializeAndGetState({initialValue, stateIndex, stateMap})
					const set
						= createStateSetter({stateMap, stateIndex, currentValue, rerender})
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
