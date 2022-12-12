
import {html} from "lit"
import {property} from "lit/decorators.js"

import {MagicalElement} from "../../elephant.js"
import {mixinCss} from "../../mixins/mixin-css.js"
import counterStylesCss from "../styles/counter-styles.css.js"

@mixinCss(counterStylesCss)
export class CounterElement extends MagicalElement {

	@property({type: Number})
	start = 0

	realize() {
		const {use} = this
		const [count, setCount] = use.state(use.element.start)

		const increment = () => setCount(count + 1)
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
