import { toJS } from "mobx";
import { toJS as deepToJS } from "../helpers";

const memo: any = {};

export class Store {
  constructor(key: string) {
    memo[key] = this;
  }

  __dev__ = process.env.NODE_ENV === "development";

  get api() {
    return this.getStore("api");
  }

  static getStore = (key: string) => memo[key];

  getStore = (key: string) => {
    return Store.getStore(key);
  };

  static getAllStore = () => memo;

  static resetStores = (stores = memo) => {
    Object.values(stores).forEach((store: any) => {
      store.reset();
    });
  };

  resetStores = (stores = memo) => {
    Store.resetStores(stores);
  };

  deepToJS = (data = this): object => deepToJS(data);

  toJS = (data = this): object => toJS(data);

  reset = (): void => {};
}
