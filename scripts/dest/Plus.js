import * as Common from "./Common.js";
var plusAmount = 0;
export class Plus {
    constructor(parent) {
        this.id = "plus" + ++plusAmount;
        this.canvas = document.createElement('canvas');
        this.canvas.id = this.id;
        Common.applySize(this.canvas, Common.canvasSize * 3);
        this.canvas.classList.add("canvasargument");
        parent.appendChild(this.canvas);
        this.canvas.onmouseover = () => {
            this.draw(true);
        };
        this.canvas.onmouseleave = () => {
            this.draw(false);
        };
        this.Draw();
    }
    Draw() {
        this.draw(false);
    }
    draw(fill) {
        this.Clear();
        const ctx = this.canvas.getContext("2d");
        Common.applyStyle(ctx, 1);
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(25, 10);
        ctx.lineTo(35, 10);
        ctx.lineTo(35, 25);
        ctx.lineTo(50, 25);
        ctx.lineTo(50, 35);
        ctx.lineTo(35, 35);
        ctx.lineTo(35, 35);
        ctx.lineTo(35, 50);
        ctx.lineTo(25, 50);
        ctx.lineTo(25, 35);
        ctx.lineTo(10, 35);
        ctx.lineTo(10, 25);
        ctx.lineTo(25, 25);
        ctx.lineTo(25, 10);
        if (fill) {
            ctx.fill();
        }
        else {
            ctx.stroke();
        }
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
}
