export function mixinContextRequirement() {
    return function (Base) {
        return class extends Base {
            static withContext(context) {
                return class extends this {
                    get context() {
                        return context;
                    }
                };
            }
            get context() {
                throw new Error("context required");
            }
        };
    };
}
//# sourceMappingURL=mixin-context-requirement.js.map