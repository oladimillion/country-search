"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var logger_1 = __importDefault(require("../helper/logger"));
exports.default = (function (req, res, next) {
    if (process.env.NODE_ENV === "development") {
        logger_1.default.info("%s %s", req.method, req.url);
    }
    next();
});
