
import {css} from "lit"
import {MyDemo} from "./my-demo.js"
import {themeElements} from "../../theme-elements.js"
import {registerElements} from "../../register-elements.js"

const components = themeElements(css``, {MyDemo})
registerElements(components)

console.log("🪄 magical: successful startup")
