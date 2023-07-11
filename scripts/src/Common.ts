import { Updater } from "./Interfaces";

export const canvasSize = 20;
export const inType = "in";
export const outType = "out";
export var afterDragUpdaters: Updater[] = [];

export function StyleIdForDataType(dataType: string): number {
	switch (dataType) {
		case "int":
			return 2;
		case "int64":
			return 3;
		case "int32":
			return 4;
		case "int16":
			return 5;
		case "int8":
			return 6;
		case "uint":
			return 7;
		case "uint64":
			return 8;
		case "uint32":
			return 9;
		case "uint16":
			return 10;
		case "uint8":
			return 11;
		case "byte":
			return 12;
		case "string":
			return 13;
		case "bool":
			return 14;
		case "float64":
			return 15;
		case "float32":
			return 16;
		case "date":
			return 17;
	}
	return 2;
}

export function ApplyStyle(ctx: CanvasRenderingContext2D, styleId: number) {
	switch (styleId) {
		case 0: {
			ctx.strokeStyle = "white";
			ctx.fillStyle = "white";
			break;
		}
		case 1: {
			ctx.strokeStyle = "#b0b0b010";
			ctx.fillStyle = "#b0b0b070";
			break;
		}
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
		case 8:
		case 9:
		case 10:
		case 11:
		case 12: {
			ctx.strokeStyle = "red";
			ctx.fillStyle = "red";
			break;
		}
		case 13: {
			ctx.strokeStyle = "blue";
			ctx.fillStyle = "blue";
			break;
		}
		case 14: {
			ctx.strokeStyle = "pink";
			ctx.fillStyle = "pink";
			break;
		}
		case 15:
		case 16: {
			ctx.strokeStyle = "purple";
			ctx.fillStyle = "purple";
			break;
		}
		case 17: {
			ctx.strokeStyle = "yellow";
			ctx.fillStyle = "yellow";
			break;
		}

	}

}

export function ApplySize(canvas: HTMLCanvasElement, size: number) {
	canvas.width = size;
	canvas.height = size;
}

export function AfterDrag() {
	for (let updater of afterDragUpdaters) {
		updater.Update();
	}
}

export function DragElement(element: HTMLElement) {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

	document.getElementById(element.id + "-header")!.onmousedown = dragMouseDown;

	function dragMouseDown(e: MouseEvent) {
		e.preventDefault();
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		document.onmousemove = elementDrag;
	}

	function elementDrag(e: MouseEvent) {
		e.preventDefault();
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		element.style.top = (element.offsetTop - pos2) + "px";
		element.style.left = (element.offsetLeft - pos1) + "px";
		AfterDrag();
	}

	function closeDragElement() {
		document.onmouseup = null;
		document.onmousemove = null;
	}
}

export function IsNodeOrChildOfNode(target: EventTarget): boolean {
	for (const node of document.getElementsByClassName("node")!) {
		if (IsElementOrChild(target, node)) {
			return true;
		}
	}

	return false;
}

export function IsElementOrChild(wanted: EventTarget, element: Element) {
	if (wanted == element) {
		return true;
	}

	if (!element.hasChildNodes()) {
		return false;
	}

	for (const child of element.children) {
		if (IsElementOrChild(wanted, child)) {
			return true;
		}
	}

	return false;
}