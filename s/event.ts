
const defaultDispatchOptions: Omit<CustomEventInit, "detail"> = {
	bubbles: true,
	composed: true,
	cancelable: true,
}

export type DispatchOptions = Omit<CustomEventInit, "detail">

export class MagicalEvent<xDetail> extends CustomEvent<xDetail> {
	static eventName: string

	constructor(name: string, detail: xDetail, options: Omit<CustomEventInit, "detail"> = defaultDispatchOptions) {
		super(name, {...options, detail})
	}
}

export function event<D>(name: string) {
	return class extends MagicalEvent<D> {
		static eventName = name

		static target = (target: EventTarget) => ({
			dispatch: (
					detail: D,
					options?: Omit<CustomEventInit, "detail">,
				) =>
				target.dispatchEvent(new this(detail, options)),

			listen: (
					listener: (e: MagicalEvent<D>) => void,
					options?: boolean | AddEventListenerOptions,
				) => {
				target.addEventListener(name, <any>listener, options)
				return () => target.removeEventListener(name, <any>listener, options)
			},
		})

		constructor(detail: D, options?: Omit<CustomEventInit, "detail">) {
			super(name, detail, options)
		}
	}
}
