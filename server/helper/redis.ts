import redis from "redis";
import log from "./logger";

const client = redis.createClient();

client.on("error", function (error: any) {
  log.error(error);
});

const redisObject = {
  get: (key: string) => {
    return new Promise((resolve, reject) => {
      client.get(key, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
  set: (key: string, data: any) => {
    return new Promise((resolve, reject) => {
      client.set(key, data, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  },
  delete: (key: string) => {
    return redisObject.set(key, "{}");
  },
};

export default redisObject;
