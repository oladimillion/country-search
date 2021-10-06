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
  confirm_password: {
    validation: "required|same:password",
  },
};

type Props = {
  accountStore: IAccountStore;
  redirectToPath(p: string): void;
  initialValues: object;
};

const SigupFormView = (props: Props) => {
  const [statusMessage, setStatusMessage] = useFormStatusMessage();
  const { accountStore, redirectToPath, initialValues } = props;

  const onSubmit = async (formProps: {
    values: any;
    setFormValue: Function;
  }) => {
    const { values } = formProps;
    const payload = { ...values, username: values?.username?.toLowerCase() };
    // @ts-ignore
    setStatusMessage();

    try {
      const data = await accountStore.signup(payload);
      localStorage.setItem("token", data.token);
      redirectToPath("/");
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
    <AuthForm
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationRules={validationRules}
      statusMessage={statusMessage}
      title="Welcome, kindly register"
      buttonText="Sign up"
    >
      <Field
        type="text"
        label="Name"
        name="username"
        placeholder="Enter Username"
      />
      <Field
        type="password"
        label="Password"
        name="password"
        placeholder="Enter Password"
      />
      <Field
        type="password"
        label="Confirm Password"
        name="confirm_password"
        placeholder="Re-enter Password"
      />
    </AuthForm>
  );
};

export default connect(SigupFormView);
