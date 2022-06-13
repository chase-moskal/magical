function arrayize(item) {
    return [item].flat();
}
const notUndefined = (x) => x !== undefined;
function combineStyles(parentStyles, newStyles) {
    const styles = [
        ...(arrayize(parentStyles) ?? []),
        ...arrayize(newStyles),
    ];
    return styles
        .flat()
        .filter(notUndefined);
}
export function mixinCss(...newStyles) {
    return function (Base) {
        var _a;
        return _a = class extends Base {
            },
            _a.styles = combineStyles(Base.styles, newStyles),
            _a;
    };
}
//# sourceMappingURL=mixin-css.js.map