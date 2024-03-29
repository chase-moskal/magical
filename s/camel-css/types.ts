
export interface Rules {
	[key: string]: string
}

type AtRule = [string, Expression[]]

export type Expression = [string, Rules, Expression[]] | AtRule

