const express = require("express");
const path = require("path");

const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const proxy = require("express-http-proxy");

app.prepare().then(() => {
  const server = express();

  //server.use(express.static(path.resolve(__dirname, "public")));

  /* server.get("/a", (req, res) => {
    console.log("/a");
    return app.render(req, res, "/a", req.query);
  });

  server.get("/b", (req, res) => {
    console.log("/b");
    return app.render(req, res, "/b", req.query);
    //return result;
  }); */

  /* proxy("http://localhost:3005/graphql", {
      proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
        proxyReqOpts.headers = {"origin": "Bearer token"};
        return proxyReqOpts;
      }
    }) */

  server.post("/csrf", proxy("http://localhost:3005/csrf"));

  server.all(
    "/graphql",
    (req, res, next) => {
      console.log("GO TO PROXY");
      next();
    },
    proxy("http://localhost:3005/graphql")
  );

  server.get("/", async (req, res) => {
    console.log("index");
    //const html = await app.renderToHTML(req, res, req.path, req.query);
    //console.log(html);
    return app.render(req, res, req.path, req.query);
  });

  server.get("/test", async (req, res) => {
    console.log("test");
    //const html = await app.renderToHTML(req, res, req.path, req.query);
    //console.log(html);
    return app.render(req, res, req.path, req.query);
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
