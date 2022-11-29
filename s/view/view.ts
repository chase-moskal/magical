
import {render} from "lit"
import {directive, Part} from "lit/directive.js"
import {AsyncDirective} from "lit/async-directive.js"

import {debounce} from "../toolbox/debounce/debounce.js"
import {createStateSetter} from "./helpers/create-state-setter.js"
import {View, Sauce, SetupMap, StateMap, Use} from "./types.js"
import {initializeAndGetState} from "./helpers/initialize-and-get-state.js"
import {createShadowDomWithStyles} from "./helpers/create-shadow-dom-with-styles.js"

export function view<xProps extends any[]>(sauce: Sauce<xProps>) {

	class ViewDirective extends AsyncDirective {
		#mostRecentProps = <xProps><unknown>[]
		#stateMap: StateMap = new Map<number, [any, any]>()
		#setupMap: SetupMap = new Map<number, () => void>()

		#generateUse(): Use {
			const stateMap = this.#stateMap
			const setupMap = this.#setupMap
			let stateIndex = 0
			let setupIndex = 0
			const rerender = debounce(
				0,
				() => this.setValue(this.#renderIntoShadowOrNot()),
			)
			return {

				state<xValue>(initialValue: xValue) {
					const [currentValue, previousValue]
						= initializeAndGetState({initialValue, stateIndex, stateMap})
					const set
						= createStateSetter<xValue>({stateMap, stateIndex, rerender})
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

		#root = viewDirective.shadow
			? createShadowDomWithStyles(viewDirective.css)
			: undefined

		#renderIntoShadowOrNot() {
			if (this.#root) {
				render(this.render(), this.#root.shadow)
				return this.#root.element
			}
			else
				return this.render()
		}

		update(part: Part, props: xProps) {
			this.#mostRecentProps = props
			return this.#renderIntoShadowOrNot()
		}

		disconnected() {
			super.disconnected()

			for (const dispose of this.#setupMap.values())
				dispose()

			this.#setupMap.clear()
			this.#stateMap.clear()
		}

		render() {
			const use = this.#generateUse()
			const renderer = sauce(use)
			return renderer(...this.#mostRecentProps)
		}
	}

	const viewDirective = <View<xProps>>directive(ViewDirective)
	return viewDirective
}
