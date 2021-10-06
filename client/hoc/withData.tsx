import React, { ComponentType } from "react";
import { inject, observer } from "mobx-react";
import { compose } from "lodash/fp";
import hoistNonReactStatics from "hoist-non-react-statics";
import { Loader } from "../components/Loader";
import { getDisplayName } from "../helpers";
import { withCustomRouter } from "./withCustomRouter";

const noop = async () => ({});
type Props = {
  redirectToPath(p: string): void;
};

export const withData =
  (getData = noop as Function) =>
  (WrappedComponent: ComponentType<any>) => {
    class Data extends React.Component<Props> {
      state = {
        loaded: false,
      };

      static displayName = `withData(${getDisplayName(WrappedComponent)})`;

      async componentDidMount() {
        const { redirectToPath } = this.props;
        try {
          const data = await getData(this.props);
          const { redirectTo, ...rest } = (data || {}) as any;
          if (redirectTo) {
            await this.setState({ loaded: true });
            return redirectToPath(redirectTo as string);
          } else {
            await this.setState({ ...rest, loaded: true });
          }
        } catch (e) {
          await this.setState({ loaded: true });
        }
      }

      render() {
        const { loaded, ...rest } = this.state;
        if (!loaded) {
          return <Loader />;
        }
        return <WrappedComponent {...this.props} {...rest} />;
      }
    }

    hoistNonReactStatics(Data, WrappedComponent);

    return compose(withCustomRouter)(Data);
  };
