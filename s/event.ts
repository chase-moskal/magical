
import {EventBase} from "./event/event-base.js"

export function MagicEvent<D>(name: string) {
	return class extends EventBase<D> {
		static eventName = name

		static target = (target: EventTarget) => ({
			dispatch: (
					detail: D,
					options?: Omit<CustomEventInit, "detail">,
				) =>
				target.dispatchEvent(new this(detail, options)),

			listen: (
					listener: (e: EventBase<D>) => void,
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
