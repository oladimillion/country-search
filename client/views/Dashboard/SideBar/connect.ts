import { compose } from "lodash/fp";
import { inject, observer } from "mobx-react";
import { withData, withCustomRouter } from "../../../hoc";
import { IAccountStore } from "../../../stores/types";

type Props = {
  accountStore: IAccountStore;
  redirectToPath: Function;
};

export const connect = compose(
  inject("navigationStore", "accountStore"),
  withCustomRouter,
  withData((props: Props) => {
    const { accountStore, redirectToPath } = props;
    const logout = async () => {
      await accountStore.logout();
      redirectToPath("/login");
    };
    return { logout };
  }),
  observer
);
