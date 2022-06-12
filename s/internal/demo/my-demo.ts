
import {LitElement, html, css} from "lit"

import {ExampleCounter} from "../../view/examples/example-counter.js"
import {mixinStyles} from "../../mixins/mixin-styles.js"
import {CamelCssDemo} from "../views/camel-css-demo/camel-css-demo.js"

@mixinStyles(css`

div {
	margin-top: 1.5em;
}

`)
export class MyDemo extends LitElement {

	render() {
		return html`
			<h2>my demo element</h2>
			<p>here is an example view:</p>
			<div>
				${ExampleCounter(0)}
			</div>
			<div>
				${CamelCssDemo()}
			</div>
		`
	}
}
