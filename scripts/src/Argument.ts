var argumentAmount: number = 0;

export function NextArgument(): string {
	return "argument" + ++argumentAmount;
}

export class Div {
	private element: HTMLElement;

	constructor(parent: HTMLElement, cssClasses: string[] = []) {
		this.element = document.createElement('div');
		this.element.classList.add(...cssClasses);
		parent.appendChild(this.element);
	}

	Element(): HTMLElement {
		return this.element;
	}
}

export class Label {

	constructor(parent: HTMLElement, inner: string, forId: string = "") {
		const label = document.createElement('label');
		label.innerHTML = inner;
		label.setAttribute("for", forId);
		parent.appendChild(label);
	}
}