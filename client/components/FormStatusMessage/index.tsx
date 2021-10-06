import React, { ComponentType } from "react";
import { castArray } from "lodash";
import {
  SuccessMessage,
  ErrorMessage,
  FlexBox,
} from "@oladimillion/react-form";

type Props = {
  message: string[] | string | undefined | null | [];
  type: "success" | "error";
  ErrorMessageComponent: ComponentType<any>;
  SuccessMessageComponent: ComponentType<any>;
};

export const FormStatusMessage = (props: Props) => {
  const {
    message,
    type,
    ErrorMessageComponent,
    SuccessMessageComponent,
    ...rest
  } = props;

  const messages = castArray(message);

  return (
    <FlexBox my={2} flexDirection={"column"} {...rest}>
      {type === "success" &&
        messages.map((msg, key) => (
          <SuccessMessageComponent key={key}>{msg}</SuccessMessageComponent>
        ))}
      {type === "error" &&
        messages.map((msg, key) => (
          <ErrorMessageComponent key={key}>{msg}</ErrorMessageComponent>
        ))}
    </FlexBox>
  );
};

FormStatusMessage.defaultProps = {
  message: [],
  type: "success",
  SuccessMessageComponent: SuccessMessage,
  ErrorMessageComponent: ErrorMessage,
};
