
import {html} from "lit"
import {property} from "lit/decorators.js"

import {MagicElement} from "../../element.js"
import {mixinCss} from "../../mixins/css.js"
import {UseElement} from "../../element/types/use-element.js"

import counterStylesCss from "../styles/counter-styles.css.js"

@mixinCss(counterStylesCss)
export class CounterElement extends MagicElement {

	@property({type: Number})
	start = 0

	realize(use: UseElement<typeof this>) {
		const [count, setCount] = use.state(this.start)

		const increment = () => setCount(count + 1)
		const reset = () => setCount(this.start)

		return html`
			<div>
				<p>count ${count}</p>
				<button @click=${increment}>increment</button>
				<button @click=${reset}>reset</button>
			</div>
		`
	}
}
