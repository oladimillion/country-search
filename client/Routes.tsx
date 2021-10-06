import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { withLoadRoutes } from "./hoc/withLoadRoutes";

const Dashboard = React.lazy(() => import("./views/Dashboard"));
const Signin = React.lazy(() => import("./views/Signin"));
const Signup = React.lazy(() => import("./views/Signup"));

export const Routes = withLoadRoutes(() => (
  <Switch>
    <Route path="/signin" exact component={Signin} />
    <Route path="/signup" exact component={Signup} />
    <Route path="/" exact component={Dashboard} />
    <Redirect from="*" to="/signin" />
  </Switch>
));
