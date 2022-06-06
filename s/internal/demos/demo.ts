
import {css} from "lit"
import {MyDemo} from "./my-demo.js"
import {themeComponents} from "../../theme-components.js"
import {registerComponents} from "../../register-components.js"

const components = themeComponents(css``, {MyDemo})
registerComponents(components)

console.log("🪄 magical: successful startup")
