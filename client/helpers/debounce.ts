let timer: any = null;

export const debounce = (func: Function, interval: number) => {
  return (...args: any[]): Promise<any> => {
    clearTimeout(timer);
    return new Promise((resolve) => {
      timer = setTimeout(() => {
        timer = null;
        resolve(func(...args));
      }, interval);
    });
  };
};
