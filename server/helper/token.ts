import { Request } from "express";
import { get } from "lodash";

export default {
  get: (req: Request) => {
    return get(req, "headers.authorization", "").replace(/^Bearer\s/, "");
  },
};
