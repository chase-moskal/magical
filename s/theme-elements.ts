
import {LitElement, CSSResultGroup} from "lit"

import {obtool} from "./toolbox/obtool.js"
import {mixinStyles} from "./mixins/mixin-styles.js"
import {Constructor} from "./toolbox/handy-types.js"

export const themeElements = <
		xElements extends {[key: string]: Constructor<LitElement>}
	>(
		theme: CSSResultGroup,
		elements: xElements,
	) => {

	return obtool(elements)
		.map(Element => mixinStyles(theme)(Element))
}
