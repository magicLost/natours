import { gql, ApolloServer, ApolloError } from "apollo-server-express";
import express, { Request, Response, urlencoded, json } from "express";
import { schema, resolvers } from "./config";
import dotenv from "dotenv";
import path from "path";
import { path as rootPath } from "app-root-path";
import { connect } from "mongoose";
import {
  csrfProtection,
  csrfProtectionGraphQL,
} from "./site/middleware/Csrf.middleware";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./error/errorManager";

const init = async () => {
  dotenv.config({ path: path.resolve(rootPath, "config.env") });

  await connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    dbName: process.env.DB_NAME,
  });

  const app = express();

  app.use(json({ limit: "10kb" })); // for parsing application/json

  app.use(urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  app.use(cookieParser());

  /* app.post("*", (req, res, next) => {
    console.log("PATH", req.url);
    //console.log("Cookie", req.cookies);
    console.log("REQ BODY ", JSON.stringify(req.body));
    next();
  }); */

  app.post("/csrf", (req, res, next) => {
    console.log("CSRF");
    let token = "";
    try {
      //console.log(JSON.stringify(ctx.req.body));
      csrfProtectionGraphQL(req, res);
      token = (req as any).csrfToken();
    } catch (err) {
      //console.log("ERROR ", err.message);
      //throw new ApolloError(err.message);
      token = (req as any).csrfToken();
    }
    console.log("CSRF", token);
    res
      .status(200)
      .json({
        token,
      })
      .end();
  });

  app.post("/graphql", (req, res, next) => {
    if (req.headers["origin"] === "http://localhost:3000") {
      console.log("PROXY ", req.originalUrl);
      //csrfProtection(req, res, next);
      next(); //remove when enable csrfProtection
    } else {
      console.log("NOT PROXY ", req.originalUrl);
      next();
      //
    }
  });

  //app.use(globalErrorHandler);

  /* app.get("/", csrfProtection, (req, res, next) => {
    console.log("TOKEN", (req as any).csrfToken());
    console.log("Cookie", req.cookies);
    next();
  }); */

  const server = new ApolloServer({
    typeDefs: schema,
    resolvers: resolvers,
    context: ({ req, res }) => {
      return { req, res };
    },
    cacheControl: false,
  });

  server.applyMiddleware({ app });

  /* app.use((req, res, next) => {
    if (res.headersSent) {
      console.log(
        "[Wierd strange not error, we get into middleware after response was send.]",
        req.method,
        req.originalUrl
      );
    } else {
      next();
    }
  }); */

  app.listen({ port: 3005 }, () => {
    console.log(
      `Server Apollo listen on http://localhost:3005${server.graphqlPath}`
    );
  });
};

init();
