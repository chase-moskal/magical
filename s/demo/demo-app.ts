
import {LitElement, html, css} from "lit"

import {mixinCss} from "../mixins/mixin-css.js"
import {CounterView} from "./views/counter-view.js"
import {CamelCssDemo} from "./views/camel-css-demo.js"

@mixinCss(css`
:host > * + * { margin-top: 0.5em; }
div { margin-bottom: 2em; }
`)
export class DemoApp extends LitElement {

	render() {
		return html`
			<p>example view:</p>
			<div>
				${CounterView(0)}
			</div>
			<p>example element:</p>
			<div>
				<counter-element start=2></counter-element>
			</div>
			<div>
				${CamelCssDemo()}
			</div>
		`
	}
}
