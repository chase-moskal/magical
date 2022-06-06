
import {html, LitElement} from "lit"
import {ExampleCounter} from "../../component/examples/example-counter.js"

export class MyDemo extends LitElement {

	render() {
		return html`
			<h2>my demo component</h2>

			<p>example counter</p>
			${ExampleCounter(0)}
		`
	}
}
