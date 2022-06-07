
import {html} from "lit"
import {component} from "../component.js"

export const ExampleCounter = component(use => (start: number) => {
	const [count, setCount] = use.state(start)
	const increment = () => setCount(previous => previous + 1)

	return html`
		<p>count ${count}</p>
		<button @click=${increment}>increment</button>
	`
})
