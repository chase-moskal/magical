
import {html, css} from "lit"
import {magical} from "../virtual-component.js"

export const ExampleCounter = magical(use => (start: number) => {
	const [count, setCount] = use.state(start)
	const increment = () => setCount(count + 1)

	return html`
		<p>count ${count}</p>
		<button @click=${increment}>increment</button>
	`
})
