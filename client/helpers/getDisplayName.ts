import { ComponentType } from "react";

export const getDisplayName = (Component: ComponentType<any>) => {
  return Component.displayName || Component.name;
};
