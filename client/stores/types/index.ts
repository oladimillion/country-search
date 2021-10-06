import { HashHistory, State, To } from "history";
import { IObservableFactory } from "mobx";

export interface ICountryStore {
  data: {
    name: string;
    alpha2Code: string;
    callingCodes: Array<string>;
    capital: string;
    altSpellings?: Array<string>;
    region: string;
  }[];
  search(q: string): Promise<any>;
}

export interface IRouterStore {
  history: HashHistory<State>;
  reset(): void;
  push(to: To, state?: State): void;
  replace(to: To, state?: State): void;
  go(n: number): void;
  back(): void;
  forward(): void;
}

export interface IAppStore {
  reset(): void;
  setDialog(d: object): void;
}

export interface IAccountStore {
  self: { username?: string } | null;
  username: string | undefined;
  load(): void;
  reset(): void;
  logout(): void;
  signin(p: object): Promise<any>;
  signup(p: object): Promise<any>;
  getSelf(): Promise<any>;
}

export interface INavigationStore {
  reset(): void;
  navItems: { icon: string; name: string; to: string; exact: boolean }[];
  showSideBar: boolean;
  toggleSideBar(): void;
}
