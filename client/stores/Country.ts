import { observable, makeObservable, action } from "mobx";
import { Store } from "./Store";
import { ICountryStore } from "./types";
import { getQueryParams } from "../helpers";

const initialState = {
  data: [] as ICountryStore["data"],
};

export class Country extends Store implements ICountryStore {
  static key = "country";

  data: ICountryStore["data"] = [];

  constructor() {
    super(Country.key);
    makeObservable(this, {
      data: observable,
      reset: action,
      search: action,
    });
  }

  search = async (name: string) => {
    const query = getQueryParams({ country_name: name });
    const { data } = await this.api.get(`country/search?${query}`);
    this.data = data;
    return data;
  };

  reset = () => {
    Object.assign(this, initialState);
  };
}
