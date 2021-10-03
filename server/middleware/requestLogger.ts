import { Request, Response, NextFunction } from "express"
import log from "../helper/logger"

export default (req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV as string === "development") {
    log.info('%s %s', req.method, req.url)
  }
  next()
}
