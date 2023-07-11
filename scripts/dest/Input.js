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
export class Input {
    constructor(parent, id = "", type = "text", cssClasses = []) {
        this.element = document.createElement('input');
        this.element.id = id;
        this.element.type = type;
        this.element.classList.add(...cssClasses);
        parent.appendChild(this.element);
    }
}
