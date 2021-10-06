// @ts-nocheck
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { withLoadRoutes } from "../../hoc/withLoadRoutes";

const Home = React.lazy(() => import("./Home"));

export const Routes = withLoadRoutes(() => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Redirect from="/*" to="/" />
  </Switch>
));
