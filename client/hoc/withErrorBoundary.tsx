import React, { ComponentType } from "react";
import styled from "styled-components";
import hoistNonReactStatics from "hoist-non-react-statics";
import { FlexBox } from "@oladimillion/react-form";
import { getDisplayName } from "../helpers";

const Info = styled.i`
  text-decoration: underline;
`;

type State = {
  hasError: boolean;
  error?: { message: string };
  errorInfo?: { componentStack: string };
};

export const withErrorBoundary = (WrappedComponent: ComponentType<any>) => {
  class ErrorBoundary extends React.Component {
    state = { hasError: false } as State;

    static getDerivedStateFromError() {
      return { hasError: true };
    }

    static displayName = `withErrorBoundary(${getDisplayName(
      WrappedComponent
    )})`;

    componentDidCatch(error: State["error"], errorInfo: State["errorInfo"]) {
      this.setState({ error, errorInfo });
    }

    render() {
      const { hasError, error, errorInfo } = this.state;
      if (hasError) {
        return (
          <FlexBox flexDirection="column" p={1}>
            <h3>
              Something went wrong: <Info>{error?.message}</Info>
            </h3>
            <pre>{errorInfo?.componentStack}</pre>
          </FlexBox>
        );
      }
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(ErrorBoundary, WrappedComponent);
};
