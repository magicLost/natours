/* import Kernel from "./Kernel";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import { path as rootPath } from "app-root-path"; */
import { init } from "./serverInit";

/* ERORRS */

//On uncaught exception we must restart our server to clean stack
/* process.on("uncaughtException", (err: Error) => {
  console.error(err.name, err.message);
  process.exit(1);
});

process.on("unhandledRejection", (reason: any, promise) => {
  console.error(reason.name, reason.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.error("SIGTERM received");
  server.close(() => {
    process.exit(1);
  });
}); */

/* END ERORRS */

init();

/* dotenv.config({ path: path.resolve(rootPath, "config.env") });

const kernel = new Kernel(rootPath);


mongoose
  .connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log("Success connection to mongoose");

    kernel.init().then(() => {
      kernel.run();

      //console.log("NODE ENV", process.env.NODE_ENV);
      //console.log("NODE PASS", process.env.PASS);

      if (kernel.app) {
        server = kernel.app.listen(process.env.PORT, () =>
          console.log(`App running on port ${process.env.PORT}`)
        );
      }
    });
  })
  .catch((err) => console.log(err));
 */
