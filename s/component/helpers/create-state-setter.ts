
import {StateMap, StateSetter, StateSettingFunction} from "../types.js"

export function createStateSetter<xValue>({
		stateMap, stateIndex, currentValue, rerender,
	}: {
		stateMap: StateMap
		stateIndex: number
		currentValue: xValue
		rerender: () => void
	}): StateSetter<xValue> {

	return valueOrFunction => {

		const newValue = typeof valueOrFunction === "function"
			? (<StateSettingFunction<xValue>>valueOrFunction)(currentValue)
			: valueOrFunction

		if (newValue !== currentValue) {
			stateMap.set(stateIndex, [newValue, currentValue])
			rerender()
		}
	}
}
