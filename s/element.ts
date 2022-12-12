
import {LitElement, TemplateResult} from "lit"

import {elem} from "./elem.js"
import {UseElement} from "./element/types/use-element.js"
import {SetupInitializer} from "./element/types/setup-initializer.js"
import {setupUseObjectForElement} from "./element/setup-use-object-for-element.js"

export class MagicElement extends LitElement {
	protected realize(
		use: UseElement<typeof this>
		): TemplateResult | void {}
	
	#renderCount = 0
	#stateCount = 0

	#elem = elem(this)
	#teardowns = new Set<() => void>()
	#setups = new Set<SetupInitializer<typeof this>>()

	#use = setupUseObjectForElement<typeof this>({
		element: this,
		elem: this.#elem,
		rerender: () => this.requestUpdate(),
		getRenderCount: () => this.#renderCount,
		incrementStateCount: () => this.#stateCount++,
		addSetup: initializer => this.#setups.add(initializer),
	})

	protected get use() {
		return this.#use
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

	render(): TemplateResult | void {
		this.#stateCount = 0
		const result = this.realize(this.#use)
		this.#renderCount += 1
		return result
	}
}
