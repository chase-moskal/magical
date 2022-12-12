
import {DispatchOptions} from "./types/dispatch-options.js"
import {defaultDispatchOptions} from "./default-dispatch-options.js"

export class EventBase<xDetail> extends CustomEvent<xDetail> {
	static eventName: string

	constructor(
			name: string,
			detail: xDetail,
			options: DispatchOptions = defaultDispatchOptions,
		) {
		super(name, {...options, detail})
	}
}
