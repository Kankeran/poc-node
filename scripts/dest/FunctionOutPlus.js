import { Menus } from "./Menus";
import { Plus } from "./Plus";
export class FunctionOutPlus {
    constructor(parent) {
        new Plus(parent, this.onClick);
    }
    onClick(plus) {
        console.log("plus clicked", plus.Id());
        const isHidden = Menus.Instance().IsHidden("menu-add-argument");
        if (isHidden || !plus.HasMenu) {
            Menus.Instance().ShowMenu("menu-add-argument", plus.Pos());
            this.handleOkButton(plus);
            plus.HasMenu = true;
        }
    }
    handleOkButton(_plus) {
        document.getElementById("menu-add-argument-button").onclick = handleClick;
        function handleClick(e) {
            e.preventDefault();
            console.log("ok");
        }
    }
}
