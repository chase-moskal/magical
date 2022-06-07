
import {CSSResultGroup} from "lit"
import {attachStylesToShadowRoot} from "./attach-styles-to-shadow-root.js"

export function createShadowDomWithStyles(css?: CSSResultGroup) {
	console.log("create shadow")
	const element = document.createElement("span")
	const shadow = element.attachShadow({mode: "open"})
	const view = document.createElement("span")
	attachStylesToShadowRoot(shadow, css)
	shadow.append(view)
	return {element, shadow, view}
}
