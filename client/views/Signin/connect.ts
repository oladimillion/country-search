import { compose } from "lodash/fp";
import { inject } from "mobx-react";
import { withData, withCustomRouter } from "../../hoc";
import { mustNotBeAuthenticated } from "../../helpers/mustNotBeAuthenticated";

export const connect = compose(
  withCustomRouter,
  withData(mustNotBeAuthenticated),
  withData(async () => {
    return {
      initialValues: { username: "", password: "" },
    };
  }),
  inject("accountStore")
);
