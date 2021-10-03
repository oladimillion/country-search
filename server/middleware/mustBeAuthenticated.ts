import { get } from 'lodash'
import { Request, Response, NextFunction } from "express"

export default (req: Request, res: Response, next: NextFunction) => {
  if (!get(req, "user")) {
    return res.status(403).json({ message: 'Authentication is required' })
  }

  return next();
};

