import { Request } from "express";
import redis from "../helper/redis";

export default {
  set: (
    accessToken: string,
    refreshToken: string,
    req: Request
  ): Promise<any> => {
    try {
      return redis.set(
        accessToken,
        JSON.stringify({
          refreshToken,
          ip: req.ip,
          userAgent: req.headers["user-agent"],
        })
      );
    } catch (e) {
      // @ts-ignore
      return null;
    }
  },
  get: async (accessToken: string): Promise<any> => {
    try {
      const data: any = await redis.get(accessToken);
      return JSON.parse(data);
    } catch (e) {
      // @ts-ignore
      return null;
    }
  },
  delete: async (accessToken: string): Promise<any> => {
    try {
      return redis.delete(accessToken);
    } catch (e) {
      // @ts-ignore
      return null;
    }
  },
};
