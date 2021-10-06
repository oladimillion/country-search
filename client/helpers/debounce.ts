export const debounce = (func: Function, interval: number) => {
  let timer: any = null;
  return (...args: any[]): Promise<any> => {
    clearTimeout(timer);
    return new Promise((resolve) => {
      timer = setTimeout(() => resolve(func(...args)), interval);
    });
  };
};
