import { promisify } from "util";
import { readFile, existsSync } from "fs";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { path as rootPath } from "app-root-path";
import Kernel from "./Kernel";
import { IErrorPages } from "./service/ErrorManager/ErrorManager";

export const getErrorPages = async (
  pathToErrorDir: string,
  serverErrorFileName: string,
  notFoundFileName: string
): Promise<IErrorPages> => {
  if (!existsSync(`${pathToErrorDir}/${serverErrorFileName}`))
    throw new Error(
      `No error html file on address - ${pathToErrorDir}/${serverErrorFileName}`
    );

  /*  let serverError = await promisify(readFile)(
    `${pathToErrorDir}/${serverErrorFileName}`,
    {
      encoding: "utf-8",
    }
  ); */

  if (!existsSync(`${pathToErrorDir}/${notFoundFileName}`))
    throw new Error(
      `No error html file on address - ${pathToErrorDir}/${notFoundFileName}`
    );

  /* let notFoundError = await promisify(readFile)(
    `${pathToErrorDir}/${notFoundFileName}`,
    {
      encoding: "utf-8",
    }
  );
 */
  const result = await Promise.all([
    promisify(readFile)(`${pathToErrorDir}/${serverErrorFileName}`, {
      encoding: "utf-8",
    }),
    promisify(readFile)(`${pathToErrorDir}/${notFoundFileName}`, {
      encoding: "utf-8",
    }),
  ]);

  return { serverError: result[0], notFound: result[1] };
};

export const getMainHtmlPage = async (pathToIndexHtml: string) => {
  if (!existsSync(pathToIndexHtml))
    throw new Error(`No error html file on address - ${pathToIndexHtml}`);

  return await promisify(readFile)(pathToIndexHtml, {
    encoding: "utf-8",
  });
};

export const setErrorHandlers = (server: any) => {
  process.on("uncaughtException", (err: Error) => {
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
  });
};

export const init = async () => {
  try {
    dotenv.config({ path: path.resolve(rootPath, "config.env") });

    await mongoose.connect("mongodb://localhost:27017", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      dbName: process.env.DB_NAME,
    });

    const kernel = new Kernel(
      rootPath,
      await getMainHtmlPage(path.resolve(rootPath, "public", "iiindex.html")),
      await getErrorPages(
        path.resolve(rootPath, "config", "htmlTemplates"),
        "server-error.html",
        "not-found-page.html"
      )
    );

    //kernel.run();

    if (kernel.app === undefined) throw new Error("No kernel app..");

    const server = kernel.app.listen(process.env.PORT, () =>
      console.log(`App running on port ${process.env.PORT}`)
    );

    setErrorHandlers(server);
  } catch (error) {
    console.error(`[SERVER INIT ERROR] ${error.message}`);
  }
};
