import { get } from "lodash"
import { Request, Response, NextFunction } from "express"
import jwt from "../helper/jwt"
import { renewAccessToken } from "../service/user"

export default async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, "headers.authorization", "")
                        .replace(/^Bearer\s/, "")
  const refreshToken = get(req, "headers.x-refresh")

  if (!accessToken) return next()

  const decoded = jwt.decode(accessToken)

  if (decoded.user) {
    // @ts-ignore
    req.user = decoded
    return next()
  } else if (!decoded.user && refreshToken) {
    const newAccessToken = await renewAccessToken(refreshToken)

    if (newAccessToken) {
      res.setHeader("x-access-token", newAccessToken)

      // @ts-ignore
      req.user = jwt.decode(newAccessToken)
    }
    return next()
  }
  return next()
}
