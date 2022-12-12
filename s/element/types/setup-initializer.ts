
import {LitElement} from "lit"

export type SetupInitializer<xProps extends {}> = (element: LitElement & xProps) =>
	(void | (() => void))
