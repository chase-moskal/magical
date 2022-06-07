
import {LitElement, html} from "lit"
import {ExampleCounter} from "../../component/examples/example-counter.js"

export class MyDemo extends LitElement {

	render() {
		return html`
			<h2>my demo element</h2>
			<p>here is an example component:</p>
			<br/>
			${ExampleCounter(0)}
		`
	}
}
