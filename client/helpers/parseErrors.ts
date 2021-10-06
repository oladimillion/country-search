export const parseErrors = (errors = {} as object) => {
  return Object.values(errors).map((value) => {
    return (value || "")
      .replace("body.", "")
      .replace("params.", "")
      .replace("query.", "");
  });
};
