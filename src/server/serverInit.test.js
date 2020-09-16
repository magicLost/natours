import { getErrorPages, getMainHtmlPage } from "./serverInit";
import path from "path";

describe("getErrorPages", () => {
  const pathToErrorDir = path.resolve(
    __dirname,
    "..",
    "..",
    "config",
    "htmlTemplates"
  );

  test("", async () => {
    const result = await getErrorPages(
      pathToErrorDir,
      "server-error.html",
      "not-found-page.html"
    );

    expect(result.serverError.includes("Something went wrong")).toEqual(true);
    expect(result.notFound.includes("Resource not found")).toEqual(true);
  });
});

describe("getMainHtmlPage", () => {
  const pathToIndexHtml = path.resolve(
    __dirname,
    "..",
    "..",
    "public",
    "iiindex.html"
  );

  test("", async () => {
    const result = await getMainHtmlPage(pathToIndexHtml);

    expect(result.includes("/static/css/")).toEqual(true);
  });
});
