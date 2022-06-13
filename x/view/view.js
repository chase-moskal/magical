var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
import { render } from "lit";
import { directive } from "lit/directive.js";
import { AsyncDirective } from "lit/async-directive.js";
import { debounce } from "../toolbox/debounce/debounce.js";
import { createStateSetter } from "./helpers/create-state-setter.js";
import { initializeAndGetState } from "./helpers/initialize-and-get-state.js";
import { createShadowDomWithStyles } from "./helpers/create-shadow-dom-with-styles.js";
export function view(sauce) {
    var _ViewDirective_instances, _ViewDirective_stateMap, _ViewDirective_setupMap, _ViewDirective_generateUse, _ViewDirective_root, _ViewDirective_renderIntoShadowOrNot;
    class ViewDirective extends AsyncDirective {
        constructor() {
            super(...arguments);
            _ViewDirective_instances.add(this);
            _ViewDirective_stateMap.set(this, new Map());
            _ViewDirective_setupMap.set(this, new Map());
            _ViewDirective_root.set(this, viewDirective.shadow
                ? createShadowDomWithStyles(viewDirective.css)
                : undefined);
        }
        update(part, props) {
            return __classPrivateFieldGet(this, _ViewDirective_instances, "m", _ViewDirective_renderIntoShadowOrNot).call(this, props);
        }
        disconnected() {
            super.disconnected();
            for (const dispose of __classPrivateFieldGet(this, _ViewDirective_setupMap, "f").values())
                dispose();
            __classPrivateFieldGet(this, _ViewDirective_setupMap, "f").clear();
            __classPrivateFieldGet(this, _ViewDirective_stateMap, "f").clear();
        }
        render(...props) {
            const use = __classPrivateFieldGet(this, _ViewDirective_instances, "m", _ViewDirective_generateUse).call(this, props);
            const renderer = sauce(use);
            return renderer(...props);
        }
    }
    _ViewDirective_stateMap = new WeakMap(), _ViewDirective_setupMap = new WeakMap(), _ViewDirective_root = new WeakMap(), _ViewDirective_instances = new WeakSet(), _ViewDirective_generateUse = function _ViewDirective_generateUse(props) {
        const stateMap = __classPrivateFieldGet(this, _ViewDirective_stateMap, "f");
        const setupMap = __classPrivateFieldGet(this, _ViewDirective_setupMap, "f");
        let stateIndex = 0;
        let setupIndex = 0;
        const rerender = debounce(0, () => this.setValue(__classPrivateFieldGet(this, _ViewDirective_instances, "m", _ViewDirective_renderIntoShadowOrNot).call(this, props)));
        return {
            state(initialValue) {
                const [currentValue, previousValue] = initializeAndGetState({ initialValue, stateIndex, stateMap });
                const set = createStateSetter({ stateMap, stateIndex, rerender });
                stateIndex += 1;
                return [currentValue, set, currentValue !== previousValue];
            },
            setup(e) {
                const initialized = setupMap.has(setupIndex);
                if (!initialized)
                    setupMap.set(setupIndex, e(rerender));
                setupIndex += 1;
            },
        };
    }, _ViewDirective_renderIntoShadowOrNot = function _ViewDirective_renderIntoShadowOrNot(props) {
        if (__classPrivateFieldGet(this, _ViewDirective_root, "f")) {
            render(this.render(...props), __classPrivateFieldGet(this, _ViewDirective_root, "f").shadow);
            return __classPrivateFieldGet(this, _ViewDirective_root, "f").element;
        }
        else
            return this.render(...props);
    };
    const viewDirective = directive(ViewDirective);
    return viewDirective;
}
//# sourceMappingURL=view.js.map