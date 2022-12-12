
import {html} from "lit"
import {property} from "lit/decorators.js"

import {MagicElement} from "../../elephant.js"
import {MagicEvent} from "../../event.js"
import {mixinCss} from "../../mixins/mixin-css.js"
import counterStylesCss from "../styles/counter-styles.css.js"

export class CoolEvent extends MagicEvent<{cool: number}>("cool") {}

@mixinCss(counterStylesCss)
export class CounterElement extends MagicElement {

	@property({type: Number})
	start = 0

	realize() {
		const {use} = this
		const [count, setCount] = use.state(use.element.start)

		const increment = () => {
			const value = count + 1
			setCount(value)
			CoolEvent
				.target(this)
				.dispatch({cool: value})
		}
		const reset = () => setCount(use.element.start)

		return html`
			<div>
				<p>count ${count}</p>
				<button @click=${increment}>increment</button>
				<button @click=${reset}>reset</button>
			</div>
		`
	}
}
