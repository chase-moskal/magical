
import {html} from "lit"

import {view} from "../../../view/view.js"
import {CamelCssError} from "../../../camel-css/errors.js"
import {debounce} from "../../../toolbox/debounce/debounce.js"
import {css, camelCss} from "../../../camel-css/camel-css-lit.js"

const startingInput = `
header {
	color: red;
	h1 {
		font-size: 1rem;
	}
}
`

export const CamelCssDemo = view(use => () => {
	const [input, setInput] = use.state(startingInput.trim())
	const [debouncedSetInput] = use.state(debounce(250, setInput))

	function handleInput(event: InputEvent) {
		const input = <HTMLInputElement>event.target!
		debouncedSetInput(input.value)
	}

	let time: number | undefined
	let output = ""
	let problem = ""
	const start = performance.now()
	try {
		output = camelCss(input)
	}
	catch (error: any) {
		console.warn(error)
		problem = error instanceof CamelCssError
			? `${error.name}: ${error.message}`
			: `unknown error ${error.name}: ${error.message}`
	}
	finally {
		time = performance.now() - start
	}

	const timeDisplay = time !== undefined
		? html`<p class=time>${time.toFixed(2)} ms</p>`
		: null

	const outputOrProblem = problem ?problem :output.trim()

	return html`
		<section>
			<h2>camel css demo</h2>
			<div ?data-problem=${!!problem}>
				<div class=input>
					<strong>input</strong>
					<textarea
						@input=${handleInput}
						@keyup=${handleInput}
						spellcheck=false>${input}</textarea>
				</div>
				<div class=output>
					<strong>output</strong>
					<textarea readonly spellcheck=false>${outputOrProblem}</textarea>
				</div>
			</div>
			${timeDisplay}
		</section>
	`
})

CamelCssDemo.css = css`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	section {
		> div {
			display: flex;
			gap: 0.5em;

			> div {
				flex: 1 1 auto;
				display: flex;
				flex-direction: column;
				color: white;

				textarea {
					width: 100%;
					height: 12em;
					padding: 0.2em;
					tab-size: 2;
					color: inherit;
					background: transparent;
					border-radius: 0.4em;
					border: 1px solid currentColor;
				}
			}

			> .output {
				color: #71ffa4;
				textarea:focus {
					outline: 0;
				}
			}
		}

		[data-problem] {
			.output {
				color: #ff6f57;
			}
		}

		.error {
			color: #ff6f57;
		}

		.time {
			font-size: 0.8em;
			color: white;
			opacity: 0.5;
			font-style: italic;
			text-align: right;
			padding: 0 1em;
		}
	}
`

CamelCssDemo.shadow = true
