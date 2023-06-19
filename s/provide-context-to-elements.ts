
export type ElementWithContext<C, E extends HTMLElement> = {
	new(...args: any[]): E
	withContext(context: C): {new(...args: any): E}
}

export function provideContextToElements<
		C,
		E extends {[key: string]: ElementWithContext<C, HTMLElement>},
	>(
		context: C,
		elements: E,
	) {

	const newElements: {[key: string]: typeof HTMLElement} = {}

	for (const [key, Element] of Object.entries(elements))
		newElements[key] =  Element.withContext(context)

	return newElements as E
}

