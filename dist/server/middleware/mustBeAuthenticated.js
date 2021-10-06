"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
exports.default = (function (req, res, next) {
    if (!(0, lodash_1.get)(req, "user")) {
        return res.status(403).json({ message: "Authentication is required" });
    }
    return next();
});
