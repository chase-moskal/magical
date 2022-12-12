
import {LitElement, TemplateResult, PropertyDeclaration, CSSResult} from "lit"

import {elem} from "./elem.js"
import {Constructor} from "./types.js"
import {Initialize} from "./element/types/initialize.js"
import {UseElement} from "./element/types/use-element.js"

export const element = <xProps extends {}>(options: {
		styles?: CSSResult
		shadow?: boolean
		initialize?: Initialize<xProps>
		properties?: {[P in keyof xProps]: PropertyDeclaration}
	}) => ({
		render: (renderHtml: (use: UseElement<xProps>) => TemplateResult) =>
			<Constructor<LitElement & xProps>><any>
				class extends LitElement
	{

	static readonly styles = options.styles
	static readonly properties = options.properties ?? {}

	#renderCount = 0
	#stateCount = 0

	#stateMap = new Map<number, any>()
	#setups = new Set<(element: LitElement & xProps) => (void | (() => void))>()
	#teardowns = new Set<() => void>()
	#elem = elem(this)

	#use: UseElement<xProps> = {
		element: <any>this,

		...this.#elem,

		setup: initializer => {
			if (this.#renderCount === 0) {
				this.#setups.add(initializer)
			}
		},

		state: initial => {
			const currentCount = this.#stateCount
			this.#stateCount += 1

			let currentValue: any
			const alreadySet = this.#stateMap.has(currentCount)

			if (alreadySet)
				currentValue = this.#stateMap.get(currentCount)

			else {
				currentValue = (
					(typeof initial === "function")
						? (<any>initial)(this)
						: initial
				)
				this.#stateMap.set(currentCount, currentValue)
			}

			const getter = () => this.#stateMap.get(currentCount)

			return [
				currentValue,
				valueOrFunction => {
					const newValue = (typeof valueOrFunction === "function")
						? (<any>valueOrFunction)(getter())
						: valueOrFunction
					this.#stateMap.set(currentCount, newValue)
					this.requestUpdate()
				},
				() => this.#stateMap.get(currentCount),
			]
		},
	}

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
