import { Arrow } from "./Arrow.js";
import * as Common from "./Common.js";
// import { Circle } from "./Circle.js";
import { Plus } from "./Plus.js";
import { Argument } from "./Argument.js";

window.addEventListener("DOMContentLoaded", () => {
	Common.dragElement(document.getElementById("node1")!);
	Common.dragElement(document.getElementById("node2")!);
	handleMenus();

	const node1input = document.getElementById("node1input")!;
	const node1output = document.getElementById("node1output")!;

	const node2input = document.getElementById("node2input")!;
	const node2output = document.getElementById("node2output")!;

	new Arrow(node1input);
	new Arrow(node1output);

	new Arrow(node2input);
	new Arrow(node2output);

	// var style = getComputedStyle(document.body);
	// console.log(style.getPropertyValue("--body-background-color"));
	
	new Argument("int64", node1input);
	new Argument("date", node1input);
	new Argument("bool", node1output);
	// new Circle(node1input);
	// new Circle(node1input);
	// new Circle(node1output);

	new Argument("float64", node2input);
	new Argument("bool", node2input);
	new Argument("int", node2output);
	// new Circle(node2input);
	// new Circle(node2input);

	new Plus(node1input, onPlusClick);
	new Plus(node1output, onPlusClick);

	new Plus(node2input, onPlusClick);
	new Plus(node2output, onPlusClick);
});

function onPlusClick(plus: Plus) {
	console.log("plus clicked", plus.Id());
}

function handleMenus() {
	const menus = document.getElementById("menus")!;
	document.oncontextmenu = showMenu;
	

	function showMenu(e: MouseEvent) {
		e.preventDefault();
		if (isNodeOrChildOfNode(e.target!)) {
			return;
		}
		menus.hidden = false;
		let mainMenu = document.getElementById("mainmenu")!;
		mainMenu.hidden = false;
		setTimeout(() => {
			mainMenu.classList.add("active");
		}, 50);
		menus.style.top = e.clientY + 'px';
		menus.style.left = e.clientX + 'px';
		document.onmousedown = leftClick;
	}

	function leftClick(e: MouseEvent) {
		e.preventDefault();
		if (e.button == 0) {
			if (e.target == null || !isElementOrChild(e.target, menus)) {
				hideMenus();
			}
		}
	}

	function hideMenus() {
		setTimeout(() => {
			menus.hidden = true;
			for (const child of menus.children) {
				(<HTMLElement>child).hidden = true;
			}
		}, 250);
		for (const child of menus.children) {
			child.classList.remove("active");
		}
		document.onmousedown = null;
	}
}

function isNodeOrChildOfNode(target: EventTarget): boolean {
	for (const node of document.getElementsByClassName("node")!) {
		if (isElementOrChild(target, node)) {
			return true;
		}
	}

	return false;
}

function isElementOrChild(wanted: EventTarget, element: Element) {
	if (wanted == element) {
		return true;
	}

	if (!element.hasChildNodes()) {
		return false;
	}

	for (const child of element.children) {
		if (isElementOrChild(wanted, child)) {
			return true;
		}
	}

	return false;
}
