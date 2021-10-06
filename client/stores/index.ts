import { Api } from "./Api";
import { App } from "./App";
import { Navigation } from "./Navigation";
import { Account } from "./Account";
import { Country } from "./Country";
import { Router } from "./Router";

export const appStore = new App();
export const navigationStore = new Navigation();
export const accountStore = new Account();
export const apiStore = new Api();
export const countryStore = new Country();
export const routerStore = new Router();
