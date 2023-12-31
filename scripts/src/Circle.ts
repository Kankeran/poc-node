import { Owner, Updater } from "./Interfaces.js";
import * as Common from "./Common.js";
import { Line, LinesMap } from "./Line.js";
import { Point } from "./Point.js";

var circleAmount: number = 0;
export var CirclesMap: Map<string, Circle> = new Map<string, Circle>();

export class Circle implements Updater {
	private canvas: HTMLCanvasElement;
	private id: string;
	private type: string;
	private style: number ;
	private lineId: string = '';
	private owner: Owner;
	private signature: string;

	constructor(parent: HTMLElement, type: string, owner: Owner, signature : string, dataType:string) {
		this.id = "circle" + ++circleAmount;
		this.type = type;
		this.style = Common.StyleIdForDataType(dataType);
		this.owner = owner;
		this.signature = signature;

		document.createElement('div')
		this.canvas = document.createElement('canvas');
		this.canvas.id = this.id;
		this.canvas.dataset.object = "circle";
		Common.ApplySize(this.canvas, Common.canvasSize * 3);
		this.canvas.classList.add("canvasargument");
		parent.appendChild(this.canvas);
		this.Draw();
		CirclesMap.set(this.id, this);

		if (this.type == Common.outType) {
			this.connectable();
		}

		Common.afterDragUpdaters.push(this);
	}

	Draw(): void {
		this.Clear();
		const ctx = this.canvas.getContext("2d")!;
		Common.ApplyStyle(ctx, this.style);
		ctx.lineWidth = 4;
		ctx.beginPath();
		ctx.arc(Common.canvasSize * 1.5, Common.canvasSize * 1.5, Common.canvasSize, 0, 2 * Math.PI);
		if (this.isConnected()) {
			ctx.fill();
		} else {
			ctx.stroke();
		}
	}

	private isConnected(): boolean {
		return this.lineId != '';
	}

	private canConnect(): boolean {
		return this.type == Common.inType && !this.isConnected();
	}

	private canConnectTo(circle : Circle): boolean {
		return this.signature != circle.signature && this.style == circle.style && this.canConnect();
	}

	Element(): HTMLCanvasElement {
		return this.canvas;
	}

	Clear(): void {
		const ctx = this.canvas.getContext('2d')!;
		ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	Remove(): void {
		CirclesMap.delete(this.id);
		this.owner.OnRemove();
	}

	Id(): string {
		return this.id;
	}

	Update(): void {
		if (this.lineId == '') {
			return;
		}
		const line = LinesMap.get(this.lineId)!;

		const sourceObject = CirclesMap.get(line.StartId())!;

		const srcBoundingCLient = sourceObject.canvas.getBoundingClientRect();
		const fromX = srcBoundingCLient.left + window.scrollX + sourceObject.canvas.offsetWidth / 2;
		const fromY = srcBoundingCLient.top + window.scrollY + sourceObject.canvas.offsetHeight / 2;
		line.Start = new Point(fromX, fromY);

		const destinationObject = CirclesMap.get(line.EndId)!;

		const destBoundingCLient = destinationObject.canvas.getBoundingClientRect();
		const toX = destBoundingCLient.left + window.scrollX + destinationObject.canvas.offsetWidth / 2;
		const toY = destBoundingCLient.top + window.scrollY + destinationObject.canvas.offsetHeight / 2;
		line.End = new Point(toX, toY);

		line.Draw();
	}

	private getObjectByPoint(point: Point, toCircle : Circle): Circle | null {
		for (const [_, circle] of CirclesMap) {
			const boundingCLient = circle.canvas.getBoundingClientRect();
			if (circle.canConnectTo(toCircle) &&
				point.X > boundingCLient.left + window.scrollX &&
				point.X < boundingCLient.right + window.scrollX &&
				point.Y > boundingCLient.top + window.scrollY &&
				point.Y < boundingCLient.bottom + window.scrollY) {
				return circle;
			}
		}

		return null
	}

	private draggable(line: Line) {
		document.onmousemove = elementDrag;

		function elementDrag(e: MouseEvent) {
			e.preventDefault();

			line.End = new Point(e.clientX, e.clientY);
			line.Draw();
		}
	}

	private closeDraggable(line: Line) {
		const sourceObject = this;
		document.onmouseup = closeDragElement;

		function closeDragElement(e: MouseEvent) {
			const destinationObject = sourceObject.getObjectByPoint(new Point(e.clientX, e.clientY), CirclesMap.get(line.StartId())!);
			if (destinationObject != null) {
				const boundingCLient = destinationObject.canvas.getBoundingClientRect();
				const toX = boundingCLient.left + window.scrollX + destinationObject.canvas.offsetWidth / 2;
				const toY = boundingCLient.top + window.scrollY + destinationObject.canvas.offsetHeight / 2;
				line.End = new Point(toX, toY);
				line.Draw();
				line.EndId = destinationObject.id;
				destinationObject.lineId = line.Id();
				destinationObject.Draw();
				destinationObject.disconnectable();
				destinationObject.owner.OnConnect();
			} else {
				line.Remove();
				if (line.StartId() != '') {
					const startObject = CirclesMap.get(line.StartId())!;
					startObject.lineId = '';
					startObject.Draw();
				}
			}
			document.onmouseup = null;
			document.onmousemove = null;
		}
	}

	private connectable() {
		const sourceObject = this;
		sourceObject.canvas.onmousedown = connectableMouseDown;
		let boundingCLient = sourceObject.canvas.getBoundingClientRect();

		let line: Line;

		function connectableMouseDown(e: MouseEvent) {
			e.preventDefault();
			if (sourceObject.isConnected() && LinesMap.get(sourceObject.lineId) != null) {
				return;
			}
			boundingCLient = sourceObject.canvas.getBoundingClientRect();
			const fromX = boundingCLient.left + window.scrollX + sourceObject.canvas.offsetWidth / 2;
			const fromY = boundingCLient.top + window.scrollY + sourceObject.canvas.offsetHeight / 2;

			line = new Line(
				new Point(fromX, fromY),
				new Point(e.clientX, e.clientY),
				sourceObject.id,
				sourceObject.style
			);
			LinesMap.set(line.Id(), line);
			sourceObject.lineId = line.Id();
			sourceObject.Draw();

			sourceObject.closeDraggable(line);
			sourceObject.draggable(line);
		}
	}

	private disconnectable() {
		const sourceObject = this;
		sourceObject.canvas.onmousedown = disconnectableMouseDown;

		const line = LinesMap.get(sourceObject.lineId);

		if (line == null) {
			sourceObject.lineId = '';
			sourceObject.canvas.onmousedown = null
			return;
		}

		function disconnectableMouseDown(e: MouseEvent) {
			e.preventDefault();
			if (!sourceObject.isConnected()) {
				sourceObject.canvas.onmousedown = null
				sourceObject.owner.OnDisconnect();
				return;
			}

			sourceObject.lineId = '';
			sourceObject.Draw();
			sourceObject.owner.OnDisconnect();

			sourceObject.closeDraggable(line!);
			sourceObject.draggable(line!);
			sourceObject.canvas.onmousedown = null
		}
	}
}