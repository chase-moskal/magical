var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { ExampleCounter } from "../../view/examples/example-counter.js";
import { mixinCss } from "../../mixins/mixin-css.js";
import { CamelCssDemo } from "../views/camel-css-demo/camel-css-demo.js";
let MyDemo = class MyDemo extends LitElement {
    render() {
        return html `
			<h2>my demo element</h2>
			<p>here is an example view:</p>
			<div>
				${ExampleCounter(0)}
			</div>
			<div>
				${CamelCssDemo()}
			</div>
		`;
    }
};
MyDemo = __decorate([
    mixinCss(css `

div {
	margin-top: 1.5em;
}

`)
], MyDemo);
export { MyDemo };
//# sourceMappingURL=my-demo.js.map