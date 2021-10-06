import { observable, makeObservable, action, runInAction } from "mobx";
import { Store } from "./Store";
import { IAccountStore } from "./types";

const initialState = {
  self: null as IAccountStore["self"],
};

export class Account extends Store implements IAccountStore {
  static key = "account";

  self: IAccountStore["self"] = null;

  constructor() {
    super(Account.key);
    Object.assign(this, initialState);
    makeObservable(this, {
      self: observable,
      reset: action,
      signin: action,
      signup: action,
      getSelf: action,
      logout: action,
    });
  }

  get username() {
    return this.self?.username;
  }

  load = () => this.getSelf();

  signup = async (payload: Object) => {
    const { data } = await this.api.post("signup", payload);
    return data;
  };

  signin = async (payload: Object) => {
    const { data } = await this.api.post("signin", payload);
    return data;
  };

  getSelf = async () => {
    if (!this.self) {
      const { data } = await this.api.get("user");
      runInAction(() => {
        this.self = data;
      });
    }
    return { self: this.self };
  };

  logout = () => {
    localStorage.removeItem("token");
    this.resetStores();
  };

  reset = () => {
    Object.assign(this, initialState);
  };
}
