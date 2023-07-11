import { IsElementOrChild, IsNodeOrChildOfNode } from "./Common";
import { Point } from "./Point";

export class Menus {
	private static instance: Menus | null = null;
	private menus: HTMLElement;
	private onHiddenCallabacks: (() => void)[] = [];
	private shouldHideCallbacks: ((target: EventTarget) => boolean)[] = [];

	private constructor() {
		this.menus = document.getElementById("menus")!;
		this.handleMenus(this.menus);
		console.log("menus", this.menus);
	}

	static Instance() {
		if (!Menus.instance) {
			Menus.instance = new Menus();
		}
		return Menus.instance;
	}

	IsHidden(menuName: string) {
		return document.getElementById(menuName)!.hidden;
	}

	AddOnHidden(callback: () => void) {
		this.onHiddenCallabacks.push(callback);
	}

	AddShouldHide(callback: (target: EventTarget) => boolean) {
		this.shouldHideCallbacks.push(callback);
	}

	private checkForShouldHide(target: EventTarget) {
		for (const cb of this.shouldHideCallbacks) {
			if (!cb(target)) {
				return false;
			}
		}
		return true;
	}

	ShowMenu(menuName: string, pos: Point) {
		for (const cb of this.onHiddenCallabacks) {
			cb();
		}
		for (const child of this.menus.children) {
			(<HTMLElement>child).hidden = true;
		}
		this.menus.hidden = false;
		let menu = document.getElementById(menuName)!;
		menu.hidden = false;
		setTimeout(() => {
			menu.classList.add("active");
		}, 50);
		this.menus.style.top = pos.Y + 'px';
		this.menus.style.left = pos.X + 'px';
		this.handleLeftClick();
	}

	private handleLeftClick() {
		const selfObject = this;
		document.onmousedown = leftClick;
		function leftClick(e: MouseEvent) {
			if (e.button == 0) {
				if (e.target == null || (selfObject.checkForShouldHide(e.target) && !IsElementOrChild(e.target, selfObject.menus))) {
					e.preventDefault();
					selfObject.HideMenus();
				}
			}
		}
	}

	HideMenus() {
		for (const cb of this.onHiddenCallabacks) {
			cb();
		}
		setTimeout(() => {
			this.menus.hidden = true;
		}, 250);
		this.hideMenuChildren();
		document.onmousedown = null;
	}

	private hideMenuChildren() {
		setTimeout(() => {
			this.menus.hidden = true;
		}, 250);
		for (const child of this.menus.children) {
			child.classList.remove("active");
		}
	}

	private handleMenus(menus: HTMLElement) {
		document.oncontextmenu = showMenu;
		const selfObject = this;

		function showMenu(e: MouseEvent) {
			e.preventDefault();
			console.log("showMenu")
			if (IsNodeOrChildOfNode(e.target!)) {
				console.log("showMenu - return")
				return;
			}
			for (const cb of selfObject.onHiddenCallabacks) {
				cb();
			}
			for (const child of menus.children) {
				(<HTMLElement>child).hidden = true;
			}

			menus.hidden = false;
			let mainMenu = document.getElementById("main-menu")!;
			mainMenu.hidden = false;
			setTimeout(() => {
				mainMenu.classList.add("active");
			}, 50);
			menus.style.top = e.clientY + 'px';
			menus.style.left = e.clientX + 'px';
			selfObject.handleLeftClick();
		}
	}
}