
import {LitElement, html, css} from "lit"

import {mixinCss} from "../mixins/mixin-css.js"
import {CounterView} from "./views/counter-view.js"
import {CamelCssDemo} from "./views/camel-css-demo.js"

@mixinCss(css`

div {
	margin-top: 1.5em;
}

p {
	margin-top: 0.8em;
}

`)
export class DemoApp extends LitElement {

	render() {
		return html`
			<h2>my demo element</h2>
			<p>here is an example view:</p>
			<div>
				${CounterView(0)}
			</div>
			<p>here is an example component:</p>
			<div>
				<counter-element start=2></counter-element>
			</div>
			<div>
				${CamelCssDemo()}
			</div>
		`
	}
}
