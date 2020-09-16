import { promisify } from "util";
import { readFile, existsSync } from "fs";
import { IErrorPages } from "./errorManager";

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
