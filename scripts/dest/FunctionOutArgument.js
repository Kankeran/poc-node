import { Div, Label, NextArgument } from "./Argument";
import { Circle } from "./Circle";
export class FunctionOutArgument {
    constructor(dataType, parent) {
        this.id = NextArgument();
        const div = new Div(parent);
        const labelDiv = new Div(div.Element(), ["label"]);
        new Label(labelDiv.Element(), dataType);
        new Circle(labelDiv.Element(), parent.dataset.type, this, parent.id.slice(0, 5), dataType);
        this.mainDiv = div.Element();
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
