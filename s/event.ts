
import {Constructor} from "./magical.js"
import {DispatchOptions} from "./event/types/dispatch-options.js"
import {defaultDispatchOptions} from "./event/default-dispatch-options.js"

export type GetDetail<E extends MagicEventBase<any>>
	= E extends MagicEventBase<infer D>
		? D
		: never

export const event = <E extends Constructor<MagicEventBase<any>> & {readonly type: string}>(Event: E) => ({
	target: (target: EventTarget) => ({

		dispatch(detail: GetDetail<InstanceType<E>>, options?: Partial<DispatchOptions>) {
			target.dispatchEvent(new Event(detail, options))
		},

		listen(listener: (event: InstanceType<E>) => void, options?: boolean | AddEventListenerOptions) {
			target.addEventListener(Event.type, <any>listener, options)
			return () => target.removeEventListener(Event.type, <any>listener, options)
		},
	})
})

export class MagicEventBase<D> extends CustomEvent<D> {
	static readonly type: string
	static readonly target = event(this).target

	constructor(name: string, options: CustomEventInit<D> & {detail: D}) {
		super(name, {...defaultDispatchOptions, ...options})
	}
}

export function MagicEvent<D>(type: string) {
	return class extends MagicEventBase<D> {
		static readonly type = type
		static readonly target = event(this).target
	}
}
