
import {EventBase} from "./event/event-base.js"
import {DispatchOptions} from "./event/types/dispatch-options.js"

export function MagicEvent<D>(name: string) {
	return class extends EventBase<D> {
		static readonly eventName = name

		static target = (target: EventTarget) => ({
			dispatch: (
					detail: D,
					options?: DispatchOptions,
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

		constructor(detail: D, options?: DispatchOptions) {
			super(name, detail, options)
		}
	}
}
