"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.default = (0, express_rate_limit_1.default)({
    windowMs: 60 * 1000,
    max: 30,
    headers: true,
    handler: function (req, res) {
        res
            .status(429)
            .json({ message: "You have exceeded the 30 requests per minute limit!" });
    },
});
