import React, { ComponentType } from "react";
import { withRouter } from "react-router-dom";
import { get } from "lodash";
import hoistNonReactStatics from "hoist-non-react-statics";

type Props = {
  history: any;
  location: any;
  match: any;
};

export const withCustomRouter = (WrappedComponent: ComponentType<any>) => {
  const CustomRouter = (props: Props) => {
    const { history, match, location } = props;
    const routePathname = location.pathname;
    const basePath = (() => {
      const pathname = routePathname.split("/");
      if (pathname.includes("create")) {
        pathname.pop();
      } else if (pathname.includes("update")) {
        pathname.splice(pathname.length - 2, pathname.length);
      }
      return pathname.join("/");
    })();
    const queryObj = (() => {
      const regex = /\?/g;
      const { search } = location || {};
      return (search || "")
        .replace(regex, "")
        .split("&")
        .reduce((accum: any, str: string) => {
          const [key, value] = str.split("=");
          accum[key] = value;
          return accum;
        }, {});
    })();
    const gotoRoute = (path = "/") => history.push(path);
    const redirectToPath = (path = null) => {
      if (!path) return;
      history.replace(path);
    };
    const getParams = (key: string, defaultValue = null as string | null) =>
      get(match.params, key, defaultValue);
    const getQuery = (key: string, defaultValue = null as string | null) =>
      get(queryObj, key, defaultValue);
    const getMode = (defaultValue = "read") => getParams("mode", defaultValue);
    const gotoPath = (path = "") => gotoRoute(`${basePath}/${path}`);
    const gotoUpdatePath = (id: string) => gotoPath(`${id}/update`);
    const gotoReadPath = (id: string) => gotoPath(`${id}`);
    const gotoCreatePath = (id: string) => gotoPath("create");

    return (
      <WrappedComponent
        {...props}
        gotoRoute={gotoRoute}
        redirectToPath={redirectToPath}
        getParams={getParams}
        getQuery={getQuery}
        getMode={getMode}
        gotoPath={gotoPath}
        gotoUpdatePath={gotoUpdatePath}
        gotoReadPath={gotoReadPath}
        gotoCreatePath={gotoCreatePath}
        routePathname={routePathname}
        basePath={basePath}
      />
    );
  };

  hoistNonReactStatics(CustomRouter, WrappedComponent);
  return withRouter(CustomRouter);
};
