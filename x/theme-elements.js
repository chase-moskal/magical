import { obtool } from "./toolbox/obtool.js";
import { mixinCss } from "./mixins/mixin-css.js";
export const themeElements = (theme, elements) => {
    return obtool(elements)
        .map(Element => mixinCss(theme)(Element));
};
//# sourceMappingURL=theme-elements.js.map