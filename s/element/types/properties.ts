
import {PropertyDeclaration} from "lit"

export type Properties<xProps extends {}> = {
	[P in keyof xProps]: PropertyDeclaration
}
