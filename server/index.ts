import express from "express";
import log from "./helper/logger";
import db from "./db";
import router from "./router";
import headerToken from "./middleware/headerToken";
import requestLogger from "./middleware/requestLogger";
import cors from "cors";
import rateLimiter from "./middleware/rateLimiter";

// loading .env variables
require("dotenv").config();

const app = express();

const PORT = process.env.PORT as string;

app.disable("x-powered-by");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// limit max request per minute to 30
app.use(rateLimiter);

// deserialize header token
app.use(headerToken);

// log every request
app.use(requestLogger);

app.use(router);

app.listen(PORT, () => {
  log.info(`Server listening on http://localhost:${PORT}`);
  db.connect();
});
