"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var lodash_1 = require("lodash");
var mustBeAuthenticated_1 = __importDefault(require("../middleware/mustBeAuthenticated"));
var validateRequest_1 = __importDefault(require("../middleware/validateRequest"));
var user_1 = __importDefault(require("../schema/user"));
var country_1 = __importDefault(require("../schema/country"));
var user_2 = __importDefault(require("../controller/user"));
var country_2 = __importDefault(require("../controller/country"));
var logger_1 = __importDefault(require("../helper/logger"));
var router = (0, express_1.Router)();
router.get("/app-health", function (req, res) { return res.sendStatus(200); });
router.post("/api/v1/signin", (0, validateRequest_1.default)(user_1.default), user_2.default.signin);
router.post("/api/v1/signup", (0, validateRequest_1.default)(user_1.default), user_2.default.signup);
router.post("/api/v1/signout", mustBeAuthenticated_1.default, user_2.default.signout);
router.get("/api/v1/user", mustBeAuthenticated_1.default, user_2.default.getUser);
router.get("/api/v1/country/search", mustBeAuthenticated_1.default, (0, validateRequest_1.default)(country_1.default), country_2.default.search);
router.use(function (req, res) {
    return res.status(404).json({ message: "Route does not exist" });
});
router.use(function (err, req, res, next) {
    logger_1.default.error((0, lodash_1.get)(err, "stack"));
    return res.status(500).json({ message: "Server error" });
});
exports.default = router;
