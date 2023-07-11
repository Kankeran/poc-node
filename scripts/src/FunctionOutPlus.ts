import { Menus } from "./Menus";
import { Plus } from "./Plus";

export class FunctionOutPlus {
	constructor(parent: HTMLElement) {
		new Plus(parent, this.onClick);
	}

	private onClick(plus: Plus) {
		console.log("plus clicked", plus.Id());
		const isHidden = Menus.Instance().IsHidden("menu-add-argument");
		if (isHidden || !plus.HasMenu) {
			Menus.Instance().ShowMenu("menu-add-argument", plus.Pos());
			this.handleOkButton(plus);
			plus.HasMenu = true;
		}
	}

	handleOkButton(_plus: Plus) {
		document.getElementById("menu-add-argument-button")!.onclick = handleClick;

		function handleClick(e: MouseEvent) {
			e.preventDefault();
			console.log("ok");
		}
	}
}