
import {elem, Elem} from "./elem.js"
import {Constructor} from "./types.js"
import {StateSetter} from "./view/types.js"
import {LitElement, TemplateResult, PropertyDeclaration, CSSResult} from "lit"

export type StateReturns<xValue> = [
	xValue,
	StateSetter<xValue>,
	() => xValue,
]

export interface Use<xProps extends {}> extends Elem {
	element: LitElement & xProps

	state<xValue>(
		initial: xValue | ((element: LitElement & xProps) => xValue)
	): StateReturns<xValue>

	setup(
		initializer: (element: LitElement & xProps) => (void | (() => void))
	): void
}

export function asPropertyDeclarations<xProps extends {}>(
		declarations: {[P in keyof xProps]: PropertyDeclaration}
	) {
	return declarations
}

export function component2<xProps extends {}>(
		options: {
			styles?: CSSResult
			shadow?: boolean
			properties?: {[P in keyof xProps]: PropertyDeclaration}
		},
	) {
	return {
		render(renderHtml: (use: Use<xProps>) => TemplateResult) {
			return component<xProps>(options, renderHtml)
		},
	}
}

export function component<xProps extends {}>(
		options: {
			styles?: CSSResult
			shadow?: boolean
			properties?: {[P in keyof xProps]: PropertyDeclaration}
		},
		renderHtml: (use: Use<xProps>) => TemplateResult,
	) {

	type xConstructor = Constructor<LitElement & xProps>

	return <xConstructor><any>class extends LitElement {
		static readonly styles = options.styles
		static readonly properties = options.properties ?? {}

		#renderCount = 0
		#stateCount = 0

		#stateMap = new Map<number, any>()
		#setups = new Set<(element: LitElement & xProps) => (void | (() => void))>()
		#teardowns = new Set<() => void>()

		#use: Use<xProps> = {
			element: <any>this,

			...elem(this),

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
	}
}
