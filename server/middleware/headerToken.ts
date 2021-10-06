import { Request, Response, NextFunction } from "express";
import jwt from "../helper/jwt";
import session from "../service/session";
import token from "../helper/token";

export default async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = token.get(req);

  if (!accessToken) {
    return next();
  }

  const { refreshToken, ip, userAgent } = await session.get(accessToken);
  const decoded = jwt.decode(accessToken);

  if (ip !== req.ip && userAgent !== req.headers["user-agent"]) {
    return next();
  }

  if (decoded.user) {
    // @ts-ignore
    req.user = decoded;
    return next();
  } else if (!decoded.user && refreshToken) {
    // @ts-ignore
    req.user = jwt.decode(refreshToken);
    return next();
  }
  return next();
};
