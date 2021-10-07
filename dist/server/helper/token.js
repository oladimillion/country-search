"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
exports.default = {
    get: function (req) {
        return (0, lodash_1.get)(req, "headers.authorization", "").replace(/^Bearer\s/, "");
    },
};
