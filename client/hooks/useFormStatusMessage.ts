import React from "react";

export const useFormStatusMessage = (
  message?: string[] | string,
  type?: string
) => {
  const [statusMessage, handleStatus] = React.useState({ message, type });
  const setStatusMessage = (
    message?: string[] | string,
    type: string = "success"
  ) => {
    return handleStatus({ message, type });
  };
  return [statusMessage, setStatusMessage];
};
