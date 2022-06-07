
import {html, css} from "lit"
import {component} from "../component.js"

export const ExampleCounter = component(use => (start: number) => {
	const [count, setCount] = use.state(start)
	const increment = () => setCount(previous => previous + 1)

	return html`
		<div>
			<p>count ${count}</p>
			<button @click=${increment}>increment</button>
		</div>
	`
})

ExampleCounter.css = css`
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
`

ExampleCounter.shadow = true
