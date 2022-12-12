
import {css} from "lit"
import {MyDemo} from "./my-demo.js"
import {themeElements} from "../../theme-elements.js"
import {registerElements} from "../../register-elements.js"
import {CounterElement} from "../../view/examples/counter-element.js"

const theme = css`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
`

const elements = themeElements(
	theme,
	{
		MyDemo,
		CounterElement,
	}
)

registerElements(elements)

console.log("🪄 magical: successful startup")
