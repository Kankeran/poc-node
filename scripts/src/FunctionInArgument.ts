import { Div, Label, NextArgument } from "./Argument";
import { Circle } from "./Circle";
import { GetInputType, Input } from "./Input";


export class FunctionInArgument {
	private id: string;
	private mainDiv: HTMLElement;
	constructor(dataType: string, parent: HTMLElement) {
		this.id = NextArgument();

		const div = new Div(parent)
		const labelDiv = new Div(div.Element(), ["label"]);
		new Circle(labelDiv.Element(), parent.dataset.type!, this, parent.id.slice(0, 5), dataType);
		new Label(labelDiv.Element(), dataType, this.id);
		const inputDiv = new Div(div.Element(), ["input"]);
		new Input(inputDiv.Element(), this.id, GetInputType(dataType));
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