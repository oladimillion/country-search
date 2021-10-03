import { Request, Response, NextFunction } from "express";
import Validator, { Rules } from "validatorjs";
import log from "../helper/logger";

export default (rules: Rules) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { body, params, query } = req ?? {};
    const data = { body, params, query };
    const validation = new Validator(data, rules);
    const fails = validation.fails();

    if (fails) {
      return res.status(400).json(validation.errors.all());
    }

    return next();
  };
