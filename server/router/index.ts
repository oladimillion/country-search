import { Request, Response, NextFunction, Router } from "express";
import { get } from "lodash";
import mustBeAuthenticated from "../middleware/mustBeAuthenticated";
import validateRequest from "../middleware/validateRequest";
import userSchema from "../schema/user";
import countrySchema from "../schema/country";
import userCtrl from "../controller/user";
import countryCtrl from "../controller/country";
import log from "../helper/logger";

const router = Router();

router.get("/app-health", (req: Request, res: Response) => res.sendStatus(200));

router.post("/api/v1/signin", validateRequest(userSchema), userCtrl.signin);
router.post("/api/v1/signup", validateRequest(userSchema), userCtrl.signup);
router.get("/api/v1/user", mustBeAuthenticated, userCtrl.getUser);
router.get(
  "/api/v1/country/search",
  mustBeAuthenticated,
  validateRequest(countrySchema),
  countryCtrl.search
);

router.use((req: Request, res: Response) =>
  res.status(404).json({ message: "route does not exist" })
);

router.use((err: object, req: Request, res: Response, next: NextFunction) => {
  log.error(get(err, "stack"));
  return res.status(500).json("Server error");
});

export default router;
