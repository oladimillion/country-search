"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var validatorjs_1 = __importDefault(require("validatorjs"));
exports.default = (function (rules) {
    return function (req, res, next) {
        var _a = req !== null && req !== void 0 ? req : {}, body = _a.body, params = _a.params, query = _a.query;
        var data = { body: body, params: params, query: query };
        var validation = new validatorjs_1.default(data, rules);
        var fails = validation.fails();
        if (fails) {
            return res.status(400).json(validation.errors.all());
        }
        return next();
    };
});
