import React, { ReactElement } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { FlexBox, Link } from "@oladimillion/react-form";
import sideimg from "./assets/sideimg.jpg";
import { FormStatusMessage } from "../FormStatusMessage";
import { Wrapper, Card, Button, Form, SideImage, Text } from "./styled";
import { isEmptyValue } from "../../helpers/isEmptyValue";

type Props = {
  title: string;
  children: ReactElement<any>[];
  onSubmit(p: object): void;
  validationRules: object;
  initialValues: object;
  statusMessage: object;
  buttonText: string;
};

export const AuthForm = (props: Props) => {
  const {
    title,
    onSubmit,
    children,
    validationRules,
    statusMessage,
    buttonText,
    initialValues = {},
  } = props;

  const location = useLocation();
  const isMatched = (path: string): boolean => {
    return !isEmptyValue(
      matchPath(path, { path: location.pathname, exact: true, strict: false })
    );
  };
  const isSignin = isMatched("/signin");
  const isSignup = isMatched("/signup");

  return (
    <Wrapper>
      <Card>
        <SideImage
          flex={1}
          backgroundImage={`url(${sideimg})`}
          width="100%"
          p="3rem"
        >
          <Text
            color="#fff"
            fontSize="2rem"
            textAlign="center"
            as="h3"
            textShadow="2px 2px #442f2f"
          >
            Country Search
          </Text>
        </SideImage>
        <FlexBox flex={2} p="3rem">
          <Form
            onSubmit={onSubmit}
            validationRules={validationRules}
            initialValues={initialValues}
          >
            <Text as="h3" fontSize="25px" mb="2rem">
              {title}
            </Text>

            <FormStatusMessage {...statusMessage} />
            {children}
            <Button type="submit">{buttonText}</Button>
            {isSignin && (
              <FlexBox mt={2}>
                I don't have an account? &nbsp;{" "}
                <Link to="/signup"> Sign up </Link>
              </FlexBox>
            )}
            {isSignup && (
              <FlexBox mt={2}>
                Already have an account? &nbsp;{" "}
                <Link to="/signin"> Sign in </Link>
              </FlexBox>
            )}
          </Form>
        </FlexBox>
      </Card>
    </Wrapper>
  );
};

AuthForm.defaultProps = {
  statusMessage: {},
};
