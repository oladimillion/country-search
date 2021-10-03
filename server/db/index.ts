import mongoose from "mongoose";
import log from "../helper/logger";

export default {
  connect: async () => {
    try {
      const URI = process.env.MONGODB_URI as string;;
      const db = await mongoose.connect(URI)

      log.info('Connected to DB');

      // if the Node process ends, close mongoose connection
      process.on("SIGINT", () => {
        db.disconnect()
        log.info("Mongoose default connection closed through app termination");
        process.exit(0);
      })

    } catch(err) {
      log.error("db error: ", err);
      process.exit(1);
    }
  }
}

