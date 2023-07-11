import { Div, Label, NextArgument } from "./Argument";
import { Circle } from "./Circle";

export class FunctionOutArgument {
	private id: string;
	private mainDiv: HTMLElement;
	constructor(dataType: string, parent: HTMLElement) {
		this.id = NextArgument();

		const div = new Div(parent)
		const labelDiv = new Div(div.Element(), ["label"]);
		new Label(labelDiv.Element(), dataType);
		new Circle(labelDiv.Element(), parent.dataset.type!, this, parent.id.slice(0, 5), dataType);
		this.mainDiv = div.Element();
	}

	OnConnect(): void {
		document.getElementById(this.id)!.hidden = true;
	}

	OnDisconnect(): void {
		document.getElementById(this.id)!.hidden = false;
	}

	OnRemove(): void {
		this.mainDiv.parentElement!.removeChild(this.mainDiv);
	}
}