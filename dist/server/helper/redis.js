"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redis_1 = __importDefault(require("redis"));
var logger_1 = __importDefault(require("./logger"));
var client = redis_1.default.createClient({ url: process.env.REDIS_URL });
client.on("error", function (error) {
    logger_1.default.error(error);
});
var redisObject = {
    get: function (key) {
        return new Promise(function (resolve, reject) {
            client.get(key, function (err, data) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    },
    set: function (key, data) {
        return new Promise(function (resolve, reject) {
            client.set(key, data, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    },
    delete: function (key) {
        return new Promise(function (resolve, reject) {
            client.del(key, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(key);
                }
            });
        });
    },
};
exports.default = redisObject;
