import { Circle } from "./Circle.js";
import * as Common from "./Common.js";
var argumentAmount = 0;
export function NextArgument() {
    return "argument" + ++argumentAmount;
}
export function GetInputType(dataType) {
    switch (dataType) {
        case "int":
        case "int64":
        case "int32":
        case "int16":
        case "int8":
        case "uint":
        case "uint64":
        case "uint32":
        case "uint16":
        case "uint8":
        case "byte":
            return "number";
        case "string":
            return "text";
        case "bool":
            return "checkbox";
        case "float64":
        case "float32":
            return "number";
        case "date":
            return "date";
    }
    return "checkbox";
}
export class Argument {
    constructor(dataType, parent) {
        this.dataType = dataType;
        this.id = NextArgument();
        if (parent.dataset.type == Common.inType) {
            this.mainDiv = this.createInDiv(parent.dataset.type, parent);
        }
        else {
            this.mainDiv = this.createOutDiv(parent.dataset.type, parent);
        }
    }
    createInDiv(type, parent) {
        const div = new Div(parent);
        const labelDiv = new Div(div.Element(), ["label"]);
        new Circle(labelDiv.Element(), type, this, parent.id.slice(0, 5), this.dataType);
        new Label(labelDiv.Element(), this.dataType, this.id);
        const inputDiv = new Div(div.Element(), ["input"]);
        new Input(inputDiv.Element(), this.id, GetInputType(this.dataType));
        return div.Element();
    }
    createOutDiv(type, parent) {
        const div = new Div(parent);
        const labelDiv = new Div(div.Element(), ["label"]);
        new Label(labelDiv.Element(), this.dataType);
        new Circle(labelDiv.Element(), type, this, parent.id.slice(0, 5), this.dataType);
        return div.Element();
    }
    OnConnect() {
        document.getElementById(this.id).hidden = true;
    }
    OnDisconnect() {
        document.getElementById(this.id).hidden = false;
    }
    OnRemove() {
        this.mainDiv.parentElement.removeChild(this.mainDiv);
    }
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
export class Input {
    constructor(parent, id = "", type = "text", cssClasses = []) {
        this.element = document.createElement('input');
        this.element.id = id;
        this.element.type = type;
        this.element.classList.add(...cssClasses);
        parent.appendChild(this.element);
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
