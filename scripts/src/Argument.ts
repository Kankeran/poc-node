import { Circle } from "./Circle.js";
import * as Common from "./Common.js";

var argumentAmount: number = 0;

export class Argument {
	private dataType: string;
	private id: string;

	constructor(dataType: string, parent: HTMLElement) {
		this.dataType = dataType;
		this.id = "argument" + ++argumentAmount;

		if (parent.dataset.type! == Common.inType) {
			parent.appendChild(this.createInDiv(parent.dataset.type!, parent));
		} else {
			parent.appendChild(this.createOutDiv(parent.dataset.type!, parent));
		}
	}

	createInDiv(type: string, parent : HTMLElement): HTMLDivElement {
		let div = document.createElement('div');
		let labelDiv = document.createElement('div');
		labelDiv.classList.add("label");
		labelDiv.id = parent.id.slice(0, 5) + "labeldiv"
		new Circle(labelDiv, type, this);
		let label = document.createElement('label');
		label.innerHTML = this.dataType;
		label.setAttribute("for", this.id);
		labelDiv.appendChild(label);
		div.appendChild(labelDiv);
		let inputDiv = document.createElement('div');
		inputDiv.classList.add("input");
		let input = document.createElement('input');
		input.type = this.getType();
		input.id = this.id;
		inputDiv.appendChild(input);
		div.appendChild(inputDiv);

		return div
	}

	createOutDiv(type: string, parent : HTMLElement): HTMLDivElement {
		let div = document.createElement('div');
		let labelDiv = document.createElement('div');
		labelDiv.classList.add("label");
		labelDiv.id = parent.id.slice(0, 5) + "labeldiv"
		let label = document.createElement('label');
		label.innerHTML = this.dataType;
		labelDiv.appendChild(label);
		new Circle(labelDiv, type, this);
		div.appendChild(labelDiv);

		return div;
	}

	getType(): string {
		switch (this.dataType) {
			case "int":
				return "number";
		}
		return "checkbox";
	}

	OnConnect(): void {
		document.getElementById(this.id)!.hidden = true;
	}

	OnDisconnect(): void {
		document.getElementById(this.id)!.hidden = false;
	}
}