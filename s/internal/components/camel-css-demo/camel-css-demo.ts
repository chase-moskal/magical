
import {html, TemplateResult} from "lit"

import {component} from "../../../component/component.js"
import {CamelCssError} from "../../../camel-css/errors.js"
import {camelCss, css} from "../../../camel-css/camel-css.js"
import {debounce} from "../../../toolbox/debounce/debounce.js"

const startingInput = `
header {
	color: red;
	h1 {
		font-size: 1rem;
	}
}
`

export const CamelCssDemo = component(use => () => {
	const [input, setInput] = use.state(startingInput.trim())
	const [debouncedSetInput] = use.state(debounce(250, setInput))

	function handleInput(event: InputEvent) {
		const input = <HTMLInputElement>event.target!
		debouncedSetInput(input.value)
	}

	let output = ""
	let problem = ""
	try {
		output = camelCss(input)
	}
	catch (error: any) {
		console.warn(error)
		problem = error instanceof CamelCssError
			? `${error.name}: ${error.message}`
			: `unknown error ${error.name}: ${error.message}`
	}

	return html`
		<section>
			<h2>camel css demo</h2>
			<div ?data-problem=${!!problem}>
				<div class=input>
					<strong>input</strong>
					<textarea @input=${handleInput}>${input}</textarea>
				</div>
				<div class=output>
					<strong>output</strong>
					<textarea readonly>${problem ?problem :output.trim()}</textarea>
				</div>
			</div>
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
	}
`

CamelCssDemo.shadow = true
