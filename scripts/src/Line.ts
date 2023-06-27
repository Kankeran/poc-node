import { Point } from "./Point.js";
import * as Common from "./Common.js";

var lineAmount: number = 0;
export var LinesMap: Map<string, Line> = new Map<string, Line>();

export class Line {
	Start: Point;
	End: Point;
	EndId: string = "";
	private startId: string;
	private canvas: HTMLCanvasElement;
	private id : string;
	private style:number;

	constructor(start: Point, end: Point, startId: string, style:number) {
		this.id = "line" + ++lineAmount;
		this.Start = start;
		this.End = end;
		this.canvas = document.createElement('canvas');
		this.startId = startId;
		this.style = style;

		this.canvas.id = this.id;
		this.canvas.style.position = "absolute";
		this.canvas.style.left = start.X - 30 + "px";
		this.canvas.style.top = start.Y - 30 + "px";
		this.canvas.width = Math.abs(end.X - start.X) * 2;
		this.canvas.height = Math.abs(end.Y - start.Y) * 2;
		document.body.appendChild(this.canvas);
		this.Draw();
		LinesMap.set(this.id, this);
	}

	Draw(): void {
		this.Clear();
		const width = Math.abs(this.End.X - this.Start.X) * 2;
		const height = Math.abs(this.End.Y - this.Start.Y) * 2;

		this.canvas.width = width + 200;
		this.canvas.height = height + 100
		this.canvas.style.left = this.Start.X - this.canvas.width / 2 + "px";
		this.canvas.style.top = this.Start.Y - this.canvas.height / 2 + "px";

		const ctx = this.canvas.getContext("2d")!;
		Common.applyStyle(ctx, this.style);
		ctx.lineWidth = 3;
		let x1 = this.canvas.width / 2, y1 = this.canvas.height / 2,
			x2 = x1 + this.End.X - this.Start.X, y2 = y1 + this.End.Y - this.Start.Y;
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		if (x1 >= x2) {
			let xDistance = (x1 - x2) / 2;
			let x3 = x1 - xDistance;
			let y3 = y2 - ((y2 - y1) / 2);
			xDistance = xDistance > 40 ? 80 : xDistance * 2;
			ctx.bezierCurveTo(x1 + xDistance, y1, x1 + xDistance, y3, x3, y3);
			ctx.bezierCurveTo(x2 - xDistance, y3, x2 - xDistance, y2, x2, y2);
		} else {
			ctx.bezierCurveTo(x1 + (((x2 - x1) / 4) * 3), y1, x1 + ((x2 - x1) / 4), y2, x2, y2);
		}
		ctx.stroke();
	}

	Element(): HTMLCanvasElement {
		return this.canvas;
	}

	Clear(): void {
		const ctx = this.canvas.getContext('2d')!;
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	Remove(): void {
		this.canvas.parentElement!.removeChild(this.canvas);
		LinesMap.delete(this.id);
	}

	Id(): string {
		return this.id;
	}

	StartId(): string {
		return this.startId;
	}
}