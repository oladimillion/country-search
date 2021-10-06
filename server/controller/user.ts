import { Request, Response } from "express";
import { get, omit } from "lodash";
import {
  findUser,
  createUser,
  createAuthTokens,
  validateCredential,
} from "../service/user";
import session from "../service/session";
import log from "../helper/logger";
import token from "../helper/token";

const signup = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    const { accessToken, refreshToken } = createAuthTokens(get(user, "_id"));
    session.set(accessToken, refreshToken, req);
    return res.status(201).json({ token: accessToken });
  } catch (e) {
    log.error(e as any);
    const message = get(e, "message");
    if (message.includes("duplicate key")) {
      return res.status(500).json({ message: "username already taken" });
    }
    return res.status(500).json({ message });
  }
};

const signin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const isValid = await validateCredential(username, password);
    if (isValid) {
      const user = await findUser({ username });
      const { accessToken, refreshToken } = createAuthTokens(get(user, "_id"));
      session.set(accessToken, refreshToken, req);
      return res.status(200).json({ token: accessToken });
    }
    return res
      .status(401)
      .json({ message: "Authentication credential provided is invalid" });
  } catch (e) {
    log.error(e as any);
    return res.status(500).json({ message: get(e, "message") });
  }
};

const getUser = async (req: Request, res: Response) => {
  const user = await findUser({ _id: get(req, "user.user") });
  // get logged in user detail
  return res.status(200).json(omit(user, ["password"]));
};

const signout = async (req: Request, res: Response) => {
  const accessToken = token.get(req);
  session.delete(accessToken);
  return res.sendStatus(200);
};

export default { signup, signin, getUser, signout };
