export const canvasSize = 20;
export const inType = "in";
export const outType = "out";
export var afterDragUpdaters = [];
export function applyStyle(ctx, styleId) {
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
        case 2: {
            ctx.strokeStyle = "red";
            ctx.fillStyle = "red";
            break;
        }
    }
}
export function applySize(canvas, size) {
    canvas.width = size;
    canvas.height = size;
}
export function afterDrag() {
    for (let updater of afterDragUpdaters) {
        updater.Update();
    }
}
export function dragElement(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    document.getElementById(element.id + "header").onmousedown = dragMouseDown;
    function dragMouseDown(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
        afterDrag();
    }
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
