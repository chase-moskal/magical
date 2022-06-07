
import {render} from "lit"
import {directive, Part} from "lit/directive.js"
import {AsyncDirective} from "lit/async-directive.js"

import {debounce} from "../toolbox/debounce/debounce.js"
import {createStateSetter} from "./helpers/create-state-setter.js"
import {Component, Sauce, SetupMap, StateMap, Use} from "./types.js"
import {initializeAndGetState} from "./helpers/initialize-and-get-state.js"
import {createShadowDomWithStyles} from "./helpers/create-shadow-dom-with-styles.js"

export function component<xProps extends any[]>(sauce: Sauce<xProps>) {

	class ComponentDirective extends AsyncDirective {
		#stateMap: StateMap = new Map<number, [any, any]>()
		#setupMap: SetupMap = new Map<number, () => void>()

		#generateUse(props: xProps): Use {
			const stateMap = this.#stateMap
			const setupMap = this.#setupMap
			let stateIndex = 0
			let setupIndex = 0
			const rerender = debounce(
				0,
				() => this.setValue(this.#renderIntoShadowOrNot(props)),
			)
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

		#root = componentDirective.shadow
			? createShadowDomWithStyles(componentDirective.css)
			: undefined

		#renderIntoShadowOrNot(props: xProps) {
			if (this.#root) {
				render(this.render(...props), this.#root.shadow)
				return this.#root.element
			}
			else
				return this.render(...props)
		}

		update(part: Part, props: xProps) {
			return this.#renderIntoShadowOrNot(props)
		}

		disconnected() {
			super.disconnected()

			for (const dispose of this.#setupMap.values())
				dispose()

			this.#setupMap.clear()
			this.#stateMap.clear()
		}

		render(...props: xProps) {
			const use = this.#generateUse(props)
			const renderer = sauce(use)
			return renderer(...props)
		}
	}

	const componentDirective = <Component<xProps>>directive(ComponentDirective)
	return componentDirective
}
