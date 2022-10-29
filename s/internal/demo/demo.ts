
import {css} from "lit"
import {MyDemo} from "./my-demo.js"
import {themeElements} from "../../theme-elements.js"
import {registerElements} from "../../register-elements.js"
import {ExampleCounter2} from "../../view/examples/example-counter2.js"

const theme = css`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
`

const elements = themeElements(theme, {MyDemo, NewCounter: ExampleCounter2})
registerElements(elements)

console.log("🪄 magical: successful startup")
