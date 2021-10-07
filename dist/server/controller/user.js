"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var user_1 = require("../service/user");
var session_1 = __importDefault(require("../service/session"));
var logger_1 = __importDefault(require("../helper/logger"));
var token_1 = __importDefault(require("../helper/token"));
var signup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a, accessToken, refreshToken, e_1, message;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, user_1.createUser)(req.body)];
            case 1:
                user = _b.sent();
                _a = (0, user_1.createAuthTokens)((0, lodash_1.get)(user, "_id")), accessToken = _a.accessToken, refreshToken = _a.refreshToken;
                session_1.default.set(accessToken, refreshToken, req);
                return [2 /*return*/, res.status(201).json({ token: accessToken })];
            case 2:
                e_1 = _b.sent();
                logger_1.default.error(e_1);
                message = (0, lodash_1.get)(e_1, "message");
                if (message.includes("duplicate key")) {
                    return [2 /*return*/, res.status(500).json({ message: "username already taken" })];
                }
                return [2 /*return*/, res.status(500).json({ message: message })];
            case 3: return [2 /*return*/];
        }
    });
}); };
var signin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, isValid, user, _b, accessToken, refreshToken, e_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 4, , 5]);
                _a = req.body, username = _a.username, password = _a.password;
                return [4 /*yield*/, (0, user_1.validateCredential)(username, password)];
            case 1:
                isValid = _c.sent();
                if (!isValid) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, user_1.findUser)({ username: username })];
            case 2:
                user = _c.sent();
                _b = (0, user_1.createAuthTokens)((0, lodash_1.get)(user, "_id")), accessToken = _b.accessToken, refreshToken = _b.refreshToken;
                session_1.default.set(accessToken, refreshToken, req);
                return [2 /*return*/, res.status(200).json({ token: accessToken })];
            case 3: return [2 /*return*/, res
                    .status(401)
                    .json({ message: "Authentication credential provided is invalid" })];
            case 4:
                e_2 = _c.sent();
                logger_1.default.error(e_2);
                return [2 /*return*/, res.status(500).json({ message: (0, lodash_1.get)(e_2, "message") })];
            case 5: return [2 /*return*/];
        }
    });
}); };
var getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, user_1.findUser)({ _id: (0, lodash_1.get)(req, "user.user") })];
            case 1:
                user = _a.sent();
                // get logged in user detail
                return [2 /*return*/, res.status(200).json((0, lodash_1.omit)(user, ["password"]))];
        }
    });
}); };
var signout = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var accessToken;
    return __generator(this, function (_a) {
        accessToken = token_1.default.get(req);
        session_1.default.delete(accessToken);
        return [2 /*return*/, res.sendStatus(200)];
    });
}); };
exports.default = { signup: signup, signin: signin, getUser: getUser, signout: signout };
