export const getQueryParams = (data: any) => {
  return new URLSearchParams(data).toString();
};
