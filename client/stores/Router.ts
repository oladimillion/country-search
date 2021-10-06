import { observable, makeObservable, action } from "mobx";
import { createBrowserHistory, State, To } from "history";
import { Store } from "./Store";
import { IRouterStore } from "./types";

export class Router extends Store implements IRouterStore {
  static key = "router";

  history = createBrowserHistory();
  currentLocation: State | null = null;

  constructor() {
    super(Router.key);
    makeObservable(this, {
      history: observable,
      currentLocation: observable,
      reset: action,
      forward: action,
      back: action,
      push: action,
      replace: action,
      update: action,
    });

    this.history.listen(this.update);
    // this.currentLocation = this.history.location;
  }

  get location() {
    return this.history.location;
  }

  update = (location: State) => {
    this.currentLocation = location;
  };

  forward = () => this.history.forward();

  back = () => this.history.back();

  go = (delta: number) => this.history.go(delta);

  push = (to: To, state?: State) => this.history.push(to, state);

  replace = (to: To, state?: State) => this.history.replace(to, state);

  reset = () => {
    // creating a fresh browser history
    this.history = createBrowserHistory();
    this.currentLocation = null;
  };
}
