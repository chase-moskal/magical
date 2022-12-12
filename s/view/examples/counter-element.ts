
import {html, css} from "lit"

import {property} from "lit/decorators.js"
import {MagicalElement} from "../../elephant.js"
import {mixinCss} from "../../mixins/mixin-css.js"

@mixinCss(css`
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
div {
	border: 1px solid #fff4;
	border-radius: 0.5em;
	padding: 0.5em;
	max-width: max-content;
}
button {
	color: rebeccapurple;
	padding: 0.2em 0.5em;
}
`)
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
