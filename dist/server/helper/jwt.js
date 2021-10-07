"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.default = {
    encode: function (data, options) {
        return jsonwebtoken_1.default.sign(data, process.env.SECRET_KEY, options);
    },
    decode: function (token) {
        try {
            return jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        }
        catch (e) {
            return { user: null };
        }
    },
};
