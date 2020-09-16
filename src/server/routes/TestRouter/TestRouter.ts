import express, { Router } from "express";
import { IRouter } from "../UserRouter/UserRouter";

class TestRouter implements IRouter {
  router: Router;

  constructor() {
    this.router = express.Router();

    this.init();
  }

  init = () => {
    this.router.post("/form/success", (request, response, next) => {
      //console.log(`REQUEST `, request.body);
      response.status(200).json({
        status: "SUCCESS",
      });
      /* response
          .status(200)
          .cookie("rememberme", "1", {
            expires: new Date(Date.now() + 900000),
            httpOnly: true,
          })
          .send(); */
    });

    this.router.post("/form/fail", (request, response, next) => {
      //console.log(`REQUEST `, request.body);
      response.status(200).json({
        status: "FAIL",
        error: {
          message: "Bad fat fail...",
        },
      });
    });

    this.router.post("/form/error", (request, response, next) => {
      //console.log(`REQUEST `, request.body);
      response.status(200).json({
        status: "ERROR",
        error: {
          message: "Bad fat error...",
        },
      });
    });

    this.router.post("/cookie/set", (request, response, next) => {
      console.log(`REQUEST `, request.body);
      response
        .status(200)
        .cookie("rememberme", "1", {
          expires: new Date(Date.now() + 900000),
          httpOnly: true,
        })
        .json({
          status: "SUCCESS",
        });
    });

    this.router.get("/cookie", (request, response, next) => {
      response.status(200).send(`
  
        <body>
          <h3>Hello from test.</h3>
          <br />
          <button id="button">Test set cookie</button>
        </body>
        <script>
          console.log("Hello");
          const button = document.querySelector("#button");
          button.addEventListener("click", () => {
            console.log("click");
            const data = new FormData();
            data.append("name", "Vasya");
  
            fetch("http://localhost:3000/test/cookie/set", {
              method: 'post',
              body: data
            }).then((response) => {
              console.log(response);
            }).catch(error => console.error(error.message));
          });
        </script>
  
        `);
    });
  };

  getRouter = () => {
    return this.router;
  };
}

export default TestRouter;
