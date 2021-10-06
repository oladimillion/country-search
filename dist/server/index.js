"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var logger_1 = __importDefault(require("./helper/logger"));
var db_1 = __importDefault(require("./db"));
var router_1 = __importDefault(require("./router"));
var headerToken_1 = __importDefault(require("./middleware/headerToken"));
var requestLogger_1 = __importDefault(require("./middleware/requestLogger"));
var cors_1 = __importDefault(require("cors"));
var rateLimiter_1 = __importDefault(require("./middleware/rateLimiter"));
// loading .env variables
require("dotenv").config();
var app = (0, express_1.default)();
var PORT = process.env.PORT;
app.disable("x-powered-by");
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
// limit max request per minute to 30
app.use(rateLimiter_1.default);
// deserialize header token
app.use(headerToken_1.default);
// log every request
app.use(requestLogger_1.default);
app.use(router_1.default);
app.listen(PORT, function () {
    logger_1.default.info("Server listening on http://localhost:" + PORT);
    db_1.default.connect();
});
