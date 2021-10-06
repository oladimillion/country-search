import { IAccountStore } from "../stores/types";
import { isEmptyValue } from "../helpers";

type Props = {
  accountStore: IAccountStore;
};

export const mustBeAuthenticated = (props: Props) => {
  if (isEmptyValue(props.accountStore.self)) {
    return { redirectTo: "/signin" };
  }
};
