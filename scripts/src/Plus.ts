import * as Common from "./Common.js";
import { Menus } from "./Menus.js";
import { Point } from "./Point.js";

var plusAmount: number = 0;

export class Plus {
	private canvas: HTMLCanvasElement;
	private id: string;
	private parent: HTMLElement;
	HasMenu: boolean = false;

	constructor(parent: HTMLElement, onClick: (plus: Plus) => void) {
		this.id = "plus" + ++plusAmount;
		this.parent = parent;

		this.canvas = document.createElement('canvas');
		this.canvas.id = this.id;
		Common.ApplySize(this.canvas, Common.canvasSize * 3);
		this.canvas.classList.add("canvasargument");
		parent.appendChild(this.canvas);

		this.canvas.onmouseover = () => {
			this.draw(true);
		}
		this.canvas.onmouseleave = () => {
			this.draw(false);
		}
		this.canvas.onclick = () => {
			onClick(this);
		}
		this.Draw();
		Menus.Instance().AddOnHidden(() => {
			this.HasMenu = false;
		})
		Menus.Instance().AddShouldHide((target) => {
			return target != this.canvas;
		})
	}

	Draw(): void {
		this.draw(false);
	}

	private draw(fill: boolean): void {
		this.Clear();
		const ctx = this.canvas.getContext("2d")!;
		Common.ApplyStyle(ctx, 1);
		ctx.lineWidth = 4;
		ctx.beginPath();
		ctx.moveTo(25, 10);
		ctx.lineTo(35, 10);
		ctx.lineTo(35, 25);
		ctx.lineTo(50, 25);
		ctx.lineTo(50, 35);
		ctx.lineTo(35, 35);
		ctx.lineTo(35, 35);
		ctx.lineTo(35, 50);
		ctx.lineTo(25, 50);
		ctx.lineTo(25, 35);
		ctx.lineTo(10, 35);
		ctx.lineTo(10, 25);
		ctx.lineTo(25, 25);
		ctx.lineTo(25, 10);
		if (fill) {
			ctx.fill();
		} else {
			ctx.stroke();
		}
	}

	Element(): HTMLCanvasElement {
		return this.canvas;
	}

	Clear(): void {
		const ctx = this.canvas.getContext('2d')!;
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	Id(): string {
		return this.id;
	}

	RemoveFromDom(): void {
		this.parent.removeChild(this.canvas);
	}

	AddToDom(): void {
		this.parent.appendChild(this.canvas);
	}

	Pos(): Point {
		const srcBoundingCLient = this.canvas.getBoundingClientRect();
		return new Point(
			srcBoundingCLient.left + window.scrollX,
			srcBoundingCLient.top + window.scrollY
		);
	}
}