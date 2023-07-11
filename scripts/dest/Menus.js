import { IsElementOrChild, IsNodeOrChildOfNode } from "./Common";
export class Menus {
    constructor() {
        this.onHiddenCallabacks = [];
        this.shouldHideCallbacks = [];
        this.menus = document.getElementById("menus");
        this.handleMenus(this.menus);
        console.log("menus", this.menus);
    }
    static Instance() {
        if (!Menus.instance) {
            Menus.instance = new Menus();
        }
        return Menus.instance;
    }
    IsHidden(menuName) {
        return document.getElementById(menuName).hidden;
    }
    AddOnHidden(callback) {
        this.onHiddenCallabacks.push(callback);
    }
    AddShouldHide(callback) {
        this.shouldHideCallbacks.push(callback);
    }
    checkForShouldHide(target) {
        for (const cb of this.shouldHideCallbacks) {
            if (!cb(target)) {
                return false;
            }
        }
        return true;
    }
    ShowMenu(menuName, pos) {
        for (const cb of this.onHiddenCallabacks) {
            cb();
        }
        for (const child of this.menus.children) {
            child.hidden = true;
        }
        this.menus.hidden = false;
        let menu = document.getElementById(menuName);
        menu.hidden = false;
        setTimeout(() => {
            menu.classList.add("active");
        }, 50);
        this.menus.style.top = pos.Y + 'px';
        this.menus.style.left = pos.X + 'px';
        this.handleLeftClick();
    }
    handleLeftClick() {
        const selfObject = this;
        document.onmousedown = leftClick;
        function leftClick(e) {
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
    hideMenuChildren() {
        setTimeout(() => {
            this.menus.hidden = true;
        }, 250);
        for (const child of this.menus.children) {
            child.classList.remove("active");
        }
    }
    handleMenus(menus) {
        document.oncontextmenu = showMenu;
        const selfObject = this;
        function showMenu(e) {
            e.preventDefault();
            console.log("showMenu");
            if (IsNodeOrChildOfNode(e.target)) {
                console.log("showMenu - return");
                return;
            }
            for (const cb of selfObject.onHiddenCallabacks) {
                cb();
            }
            for (const child of menus.children) {
                child.hidden = true;
            }
            menus.hidden = false;
            let mainMenu = document.getElementById("main-menu");
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
Menus.instance = null;
