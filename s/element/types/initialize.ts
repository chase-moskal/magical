
import {LitElement} from "lit"
import {Elem} from "../../elem.js"

export type Initialize<xProps extends {}> =
	(e: LitElement & xProps, elem: Elem) => void
