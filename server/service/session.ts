import { Request } from "express";
import redis from "../helper/redis";
import log from "../helper/logger";

export default {
  set: async (accessToken: string, refreshToken: string, req: Request) => {
    try {
      redis.set(
        accessToken,
        JSON.stringify({
          refreshToken,
          ip: req.ip,
          userAgent: req.headers["user-agent"],
        })
      );
    } catch (e: any) {
      log.error(e);
    }
  },
  get: async (accessToken: string): Promise<any> => {
    try {
      const data: any = await redis.get(accessToken);
      if (!data) {
        return {};
      }
      return JSON.parse(data);
    } catch (e: any) {
      log.error(e);
      return {};
    }
  },
  delete: async (accessToken: string) => {
    try {
      redis.delete(accessToken);
    } catch (e: any) {
      log.error(e);
    }
  },
};
