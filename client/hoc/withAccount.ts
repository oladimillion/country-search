import { compose } from "lodash/fp";
import { inject } from "mobx-react";
import { withData } from "./withData";
import { IAccountStore } from "../stores/types";

type Props = {
  accountStore: IAccountStore;
};

export const withAccount = compose(
  inject("accountStore"),
  withData(async (props: Props) => {
    await props.accountStore.load();
  })
);
