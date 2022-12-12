
import {html} from "lit"
import {view} from "../../view/view.js"
import counterStylesCss from "../styles/counter-styles.css.js"

export const CounterView = view(use => (start: number) => {
	const [count, setCount] = use.state(start)
	const increment = () => setCount(previous => previous + 1)

	return html`
		<div>
			<p>count ${count}</p>
			<button @click=${increment}>increment</button>
		</div>
	`
})

CounterView.css = counterStylesCss
CounterView.shadow = true
