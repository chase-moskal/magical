
import {LitElement, TemplateResult, CSSResult} from "lit"

import {elem} from "./elem.js"
import {Constructor} from "./toolbox/handy-types.js"
import {Initialize} from "./element/types/initialize.js"
import {Properties} from "./element/types/properties.js"
import {UseElement} from "./element/types/use-element.js"
import {SetupInitializer} from "./element/types/setup-initializer.js"
import {setupUseObjectForElement} from "./element/setup-use-object-for-element.js"

export const element = <xProps extends {}>(options: {
		shadow?: boolean
		styles?: CSSResult
		initialize?: Initialize<xProps>
		properties?: Properties<xProps>
	}) => ({
		render: (renderHtml: (use: UseElement<xProps>) => TemplateResult) =>
			<Constructor<LitElement & xProps>><any>
				class extends LitElement {

	static readonly styles = options.styles
	static readonly properties = options.properties ?? {}

	#renderCount = 0
	#stateCount = 0

	#elem = elem(this)
	#teardowns = new Set<() => void>()
	#setups = new Set<SetupInitializer<xProps>>()

	#use = setupUseObjectForElement<xProps>({
		elem: this.#elem,
		rerender: () => this.requestUpdate(),
		getRenderCount: () => this.#renderCount,
		incrementStateCount: () => this.#stateCount++,
		addSetup: initializer => this.#setups.add(initializer),
	})

	constructor() {
		super()
		if (options.initialize)
			options.initialize(<any>this, this.#elem)
	}

	firstUpdated() {
		for (const initializer of this.#setups) {
			const teardown = initializer(<any>this)
			if (teardown)
				this.#teardowns.add(teardown)
		}
	}

	disconnectedCallback() {
		for (const teardown of this.#teardowns)
			teardown()
		this.#teardowns.clear()
		this.#renderCount = 0
		super.disconnectedCallback()
	}

	createRenderRoot() {
		if (options.shadow ?? true)
			return super.createRenderRoot()

		else {
			const root = document.createElement("div")
			this.appendChild(root)

			if (options.styles) {
				const style = document.createElement("style")
				style.textContent = options.styles.cssText
				this.appendChild(style)
			}

			return root
		}
	}

	render() {
		this.#stateCount = 0
		const result = renderHtml(this.#use)
		this.#renderCount += 1
		return result
	}
}})
