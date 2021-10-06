import { makeObservable, action } from "mobx";
import { Store } from "./Store";
import { sweetAlert } from "../helpers";
import { IAppStore } from "./types";

export class App extends Store implements IAppStore {
  static key = "app";

  constructor() {
    super(App.key);
    makeObservable(this, {
      reset: action,
      setDialog: action,
    });
  }

  setDialog = (dialogProps = {} as object) => {
    sweetAlert(dialogProps);
  };
}
