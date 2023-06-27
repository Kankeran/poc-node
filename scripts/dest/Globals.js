export var connectableInArray = [];
export function isCursorAboveConnectableIn(mouseEvent) {
    for (let i = 0; i < connectableInArray.length; i++) {
        const boundingCLient = connectableInArray[i].Element().getBoundingClientRect();
        if (mouseEvent.clientX > boundingCLient.left + window.scrollX &&
            mouseEvent.clientX < boundingCLient.right + window.scrollX &&
            mouseEvent.clientY > boundingCLient.top + window.scrollY &&
            mouseEvent.clientY < boundingCLient.bottom + window.scrollY) {
            return i;
        }
    }
    return -1;
}
