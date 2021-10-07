"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pino_1 = __importDefault(require("pino"));
var dayjs_1 = __importDefault(require("dayjs"));
exports.default = (0, pino_1.default)({
    prettyPrint: true,
    base: {
        pid: false,
    },
    timestamp: function () { return ",\"time\":\"" + (0, dayjs_1.default)().format() + "\""; },
});
