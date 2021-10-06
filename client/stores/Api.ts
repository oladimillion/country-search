import axios, { AxiosRequestConfig } from "axios";
import { makeObservable, action } from "mobx";
import { Store } from "./Store";

export class Api extends Store {
  static key = "api";

  constructor() {
    super(Api.key);
    makeObservable(this, {
      reset: action,
    });
  }

  get baseURL() {
    return this.__dev__ ? "http://127.0.0.1:8000" : "";
  }

  get token() {
    const token = localStorage.getItem("token");
    return token ? `Bearer ${token}` : null;
  }

  axios = (
    args = {} as { url: string; method: string; params?: object; data?: object }
  ) => {
    // @ts-ignore
    return axios({
      ...args,
      baseURL: this.baseURL,
      url: `/api/v1/${args.url}`,
      ...(this.token && { headers: { authorization: this.token } }),
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Content-Type": "application/json; charset=utf-8",
    });
  };

  get = (url: string, params = {} as object, method = "get" as string) => {
    return this.axios({ method, url, params });
  };

  delete = (url: string) => this.get(url, {}, "delete");

  post = (url: string, data = {} as object, method = "post" as string) => {
    return this.axios({ method, url, data });
  };

  // @ts-ignore
  put = (...args: any[]) => this.post(...args, "put");

  // @ts-ignore
  patch = (...args: any[]) => this.post(...args, "patch");
}
