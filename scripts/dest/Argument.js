import { Circle } from "./Circle.js";
import * as Common from "./Common.js";
var argumentAmount = 0;
export class Argument {
    constructor(dataType, parent) {
        this.dataType = dataType;
        this.id = "argument" + ++argumentAmount;
        if (parent.dataset.type == Common.inType) {
            parent.appendChild(this.createInDiv(parent.dataset.type));
        }
        else {
            parent.appendChild(this.createOutDiv(parent.dataset.type));
        }
    }
    createInDiv(type) {
        let div = document.createElement('div');
        let labelDiv = document.createElement('div');
        labelDiv.classList.add("label");
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
        return div;
    }
    createOutDiv(type) {
        let div = document.createElement('div');
        let labelDiv = document.createElement('div');
        labelDiv.classList.add("label");
        let label = document.createElement('label');
        label.innerHTML = this.dataType;
        labelDiv.appendChild(label);
        new Circle(labelDiv, type, this);
        div.appendChild(labelDiv);
        return div;
    }
    getType() {
        switch (this.dataType) {
            case "int":
                return "number";
        }
        return "checkbox";
    }
    OnConnect() {
        document.getElementById(this.id).hidden = true;
    }
    OnDisconnect() {
        document.getElementById(this.id).hidden = false;
    }
}
