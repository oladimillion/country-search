import { Request, Response } from "express"
import rateLimit from "express-rate-limit"

export default rateLimit({
  windowMs: 60 * 1000, // 1 minute in milliseconds
  max: 30, // max of 30 request per minute
  headers: true,
  handler: function (req: Request, res: Response) {
    res.status(429).json({ message: "You have exceeded the 30 requests per minute limit!" })
  },
})
