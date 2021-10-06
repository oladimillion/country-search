import { observable, makeObservable, action } from "mobx";
import { Store } from "./Store";
import { INavigationStore } from "./types";

const initialState = {
  navItems: [
    {
      icon: "home",
      name: "Dashboard",
      to: "/",
      exact: true,
    },
  ],
};

export class Navigation extends Store implements INavigationStore {
  static key = "navigation";
  showSideBar = true;
  navItems: INavigationStore["navItems"] = initialState.navItems;

  constructor() {
    super(Navigation.key);
    makeObservable(this, {
      navItems: observable,
      showSideBar: observable,
      reset: action,
      toggleSideBar: action,
    });
  }

  toggleSideBar = () => {
    this.showSideBar = !this.showSideBar;
  };

  reset = () => {
    Object.assign(this, initialState);
  };
}
