var argumentAmount = 0;
export function NextArgument() {
    return "argument" + ++argumentAmount;
}
export class Div {
    constructor(parent, cssClasses = []) {
        this.element = document.createElement('div');
        this.element.classList.add(...cssClasses);
        parent.appendChild(this.element);
    }
    Element() {
        return this.element;
    }
}
export class Label {
    constructor(parent, inner, forId = "") {
        const label = document.createElement('label');
        label.innerHTML = inner;
        label.setAttribute("for", forId);
        parent.appendChild(label);
    }
}
