
import {LitElement, CSSResultGroup} from "lit"

import {obtool} from "./toolbox/obtool.js"
import {mixinStyles} from "./mixins/mixin-styles.js"
import {Constructor} from "./toolbox/handy-types.js"

export const themeElements = <
		xComponents extends {[key: string]: Constructor<LitElement>}
	>(
		theme: CSSResultGroup,
		components: xComponents,
	) => {

	return obtool(components)
		.map(Component => mixinStyles(theme)(Component))
}
