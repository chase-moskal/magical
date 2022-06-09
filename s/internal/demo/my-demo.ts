
import {LitElement, html, css} from "lit"
import {property} from "lit/decorators.js"

import {compile} from "../../camel-css/compilation/compile.js"
import {parse} from "../../camel-css/parsing/ordinary/parse.js"
import {tokenize} from "../../camel-css/parsing/ordinary/tokenize.js"
import {ExampleCounter} from "../../component/examples/example-counter.js"

export class MyDemo extends LitElement {

	static styles = css`

		div {
			display: flex;
			justify-content: space-between;
			padding: 1rem 0;
		}

		textarea {
			width: 12rem;
			height: 14rem;
			background: transparent;
			color: white;
			padding: 0.2rem;
			border-radius: 5px;
		}
	`

	@property()
	private demoInput: string = `
		header {
			color: red;
			h1 {
				font-size: 1rem;
			}
		}
	`

	@property()
	private demoOutput: string = ""

	#handleInputChange = (event: Event) => {
		const input = event.target as HTMLTextAreaElement

		const tokens = tokenize(input.value)
		const expressions = parse(tokens)
		const css = compile(expressions)

		this.demoOutput = css
	}

	render() {
		return html`
			<h2>my demo element</h2>
			<p>here is an example component:</p>
			<br/>
			${ExampleCounter(0)}

			<div>
				<textarea style="width: 12rem; height:14rem" @input=${this.#handleInputChange}></textarea>
				<textarea readonly>${this.demoOutput}</textarea>
			</div>
		`
	}
}
