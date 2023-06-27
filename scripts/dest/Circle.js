import * as Common from "./Common.js";
import { Line, LinesMap } from "./Line.js";
import { Point } from "./Point.js";
var circleAmount = 0;
export var CirclesMap = new Map();
export class Circle {
    constructor(parent, type, onConnector) {
        this.style = 2;
        this.lineId = '';
        this.id = "circle" + ++circleAmount;
        this.type = type;
        this.onConnector = onConnector;
        this.parent = parent;
        document.createElement('div');
        this.canvas = document.createElement('canvas');
        this.canvas.id = this.id;
        Common.applySize(this.canvas, Common.canvasSize * 3);
        this.canvas.classList.add("canvasargument");
        parent.appendChild(this.canvas);
        this.Draw();
        CirclesMap.set(this.id, this);
        if (this.type == Common.outType) {
            this.connectable();
        }
        Common.afterDragUpdaters.push(this);
    }
    Draw() {
        this.Clear();
        const ctx = this.canvas.getContext("2d");
        Common.applyStyle(ctx, this.style);
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(Common.canvasSize * 1.5, Common.canvasSize * 1.5, Common.canvasSize, 0, 2 * Math.PI);
        if (this.isConnected()) {
            ctx.fill();
        }
        else {
            ctx.stroke();
        }
    }
    isConnected() {
        return this.lineId != '';
    }
    canConnect() {
        return this.type == Common.inType && !this.isConnected();
    }
    canConnectTo(circle) {
        return this.parent.id.slice(0, 5) != circle.parent.id.slice(0, 5) && this.canConnect();
    }
    Element() {
        return this.canvas;
    }
    Clear() {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    Id() {
        return this.id;
    }
    Update() {
        if (this.lineId == '') {
            return;
        }
        const line = LinesMap.get(this.lineId);
        const sourceObject = CirclesMap.get(line.StartId());
        const srcBoundingCLient = sourceObject.canvas.getBoundingClientRect();
        const fromX = srcBoundingCLient.left + window.scrollX + sourceObject.canvas.offsetWidth / 2;
        const fromY = srcBoundingCLient.top + window.scrollY + sourceObject.canvas.offsetHeight / 2;
        line.Start = new Point(fromX, fromY);
        const destinationObject = CirclesMap.get(line.EndId);
        const destBoundingCLient = destinationObject.canvas.getBoundingClientRect();
        const toX = destBoundingCLient.left + window.scrollX + destinationObject.canvas.offsetWidth / 2;
        const toY = destBoundingCLient.top + window.scrollY + destinationObject.canvas.offsetHeight / 2;
        line.End = new Point(toX, toY);
        line.Draw();
    }
    getObjectByPoint(point, toCircle) {
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
        return null;
    }
    draggable(line) {
        document.onmousemove = elementDrag;
        function elementDrag(e) {
            e.preventDefault();
            line.End = new Point(e.clientX, e.clientY);
            line.Draw();
        }
    }
    closeDraggable(line) {
        const sourceObject = this;
        document.onmouseup = closeDragElement;
        function closeDragElement(e) {
            const destinationObject = sourceObject.getObjectByPoint(new Point(e.clientX, e.clientY), CirclesMap.get(line.StartId()));
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
                destinationObject.onConnector.OnConnect();
            }
            else {
                line.Remove();
                if (line.StartId() != '') {
                    const startObject = CirclesMap.get(line.StartId());
                    startObject.lineId = '';
                    startObject.Draw();
                }
            }
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
    connectable() {
        const sourceObject = this;
        sourceObject.canvas.onmousedown = connectableMouseDown;
        let boundingCLient = sourceObject.canvas.getBoundingClientRect();
        let line;
        function connectableMouseDown(e) {
            e.preventDefault();
            if (sourceObject.isConnected() && LinesMap.get(sourceObject.lineId) != null) {
                return;
            }
            boundingCLient = sourceObject.canvas.getBoundingClientRect();
            const fromX = boundingCLient.left + window.scrollX + sourceObject.canvas.offsetWidth / 2;
            const fromY = boundingCLient.top + window.scrollY + sourceObject.canvas.offsetHeight / 2;
            line = new Line(new Point(fromX, fromY), new Point(e.clientX, e.clientY), sourceObject.id, sourceObject.style);
            LinesMap.set(line.Id(), line);
            sourceObject.lineId = line.Id();
            sourceObject.Draw();
            sourceObject.closeDraggable(line);
            sourceObject.draggable(line);
        }
    }
    disconnectable() {
        const sourceObject = this;
        sourceObject.canvas.onmousedown = disconnectableMouseDown;
        const line = LinesMap.get(sourceObject.lineId);
        if (line == null) {
            sourceObject.lineId = '';
            sourceObject.canvas.onmousedown = null;
            return;
        }
        function disconnectableMouseDown(e) {
            e.preventDefault();
            if (!sourceObject.isConnected()) {
                sourceObject.canvas.onmousedown = null;
                sourceObject.onConnector.OnDisconnect();
                return;
            }
            sourceObject.lineId = '';
            sourceObject.Draw();
            sourceObject.onConnector.OnDisconnect();
            sourceObject.closeDraggable(line);
            sourceObject.draggable(line);
            sourceObject.canvas.onmousedown = null;
        }
    }
}
