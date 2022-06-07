
import {TemplateResult} from "lit"

export type StateMap = Map<number, [any, any]> // // [currentState, previousState]
export type SetupMap = Map<number, () => void>

export type StateSettingFunction<xValue> = (previousValue: xValue) => xValue

export type ValueOrFunction<xValue> = xValue | ((previousValue: xValue) => xValue)

export type StateSetter<xValue> = (
	valueOrFunction: xValue | ValueOrFunction<xValue>
) => void

export type StateTuple<xValue> = [xValue, StateSetter<xValue>, boolean]

export interface Use {
	state<xValue>(initialValue: xValue): StateTuple<xValue>
	setup(e: (rerender: () => void) => () => void): void
}

export interface Renderer<xProps extends any[]> {
	(...props: xProps): TemplateResult | null
}

export type Sauce<xProps extends any[]> = (
	(use: Use) => Renderer<xProps>
)
