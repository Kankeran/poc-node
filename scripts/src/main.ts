import { Arrow } from "./Arrow.js";
import { DragElement } from "./Common.js";
import { FunctionInArgument } from "./FunctionInArgument.js";
import { FunctionInPlus } from "./FunctionInPlus.js";
import { FunctionOutArgument } from "./FunctionOutArgument.js";
import { FunctionOutPlus } from "./FunctionOutPlus.js";
import { Menus } from "./Menus.js";

window.addEventListener("DOMContentLoaded", () => {
	DragElement(document.getElementById("node1")!);
	DragElement(document.getElementById("node2")!);
	Menus.Instance();

	const node1input = document.getElementById("node1-input")!;
	const node1output = document.getElementById("node1-output")!;

	const node2input = document.getElementById("node2-input")!;
	const node2output = document.getElementById("node2-output")!;

	new Arrow(node1input);
	new Arrow(node1output);

	new Arrow(node2input);
	new Arrow(node2output);

	// var style = getComputedStyle(document.body);
	// console.log(style.getPropertyValue("--body-background-color"));

	new FunctionInArgument("int64", node1input);
	new FunctionInArgument("date", node1input);
	new FunctionOutArgument("bool", node1output);
	// new Circle(node1input);
	// new Circle(node1input);
	// new Circle(node1output);

	new FunctionInArgument("float64", node2input);
	new FunctionInArgument("bool", node2input);
	new FunctionOutArgument("int", node2output);
	// new Circle(node2input);
	// new Circle(node2input);

	new FunctionInPlus(node1input);
	new FunctionOutPlus(node1output);

	new FunctionInPlus(node2input);
	new FunctionOutPlus(node2output);
});
