import React from "react";
import check from "check-types";
import { Field } from "@oladimillion/react-form";
import { IAccountStore } from "../../stores/types";
import { useFormStatusMessage } from "../../hooks";
import { AuthForm } from "../../components/AuthForm";
import { parseErrors } from "../../helpers";
import { connect } from "./connect";

const validationRules = {
  username: {
    validation: "required|min:4",
  },
  password: {
    validation: "required|min:4",
  },
};

type Props = {
  accountStore: IAccountStore;
  redirectToPath(p: string): void;
  initialValues: any;
};

const SigninFormView = (props: Props) => {
  const [statusMessage, setStatusMessage] = useFormStatusMessage();
  const { accountStore, redirectToPath, initialValues } = props;

  const onSubmit = async (formProps: {
    values: any;
    setFormValue: Function;
  }) => {
    const { values, setFormValue } = formProps;
    const payload = { ...values, username: values?.username?.toLowerCase() };
    // @ts-ignore
    setStatusMessage();

    try {
      const data = await accountStore.signin(payload);
      localStorage.setItem("token", data.token);
      return redirectToPath("/");
    } catch (e: any) {
      const { data } = e?.response || {};
      if (check.object(data)) {
        const parsedErrors = parseErrors(data);
        // @ts-ignore
        setStatusMessage(parsedErrors, "error");
      } else {
        // @ts-ignore
        setStatusMessage("Something went wrong. Try again!", "error");
      }
    }
  };

  return (
    <>
      <AuthForm
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationRules={validationRules}
        statusMessage={statusMessage}
        title="Welcome, kindly sign in"
        buttonText="Sign in"
      >
        <Field
          type="text"
          label="Username"
          name="username"
          placeholder="Enter Username"
        />
        <Field
          type="password"
          label="Password"
          name="password"
          placeholder="Enter Password"
        />
      </AuthForm>
    </>
  );
};

export default connect(SigninFormView);
