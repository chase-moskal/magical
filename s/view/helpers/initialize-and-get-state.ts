
import {StateMap} from "../types.js"

export function initializeAndGetState({initialValue, stateIndex, stateMap}: {
		initialValue: any
		stateIndex: number
		stateMap: StateMap
	}) {

	const initialized = stateMap.has(stateIndex)

	if (!initialized)
		stateMap.set(stateIndex, [initialValue, undefined])

	return stateMap.get(stateIndex)!
}
