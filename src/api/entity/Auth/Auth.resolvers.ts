import { ApolloError, AuthenticationError } from "apollo-server-express";
import UserModel from "./../User/User.model";
import { signToken, setCookieWithToken, hideUserPassword } from "./Auth.model";
import { parseMongooseErrorGraphQL } from "./../../../error/errorManager";
import { csrfProtectionGraphQL } from "./../../../site/middleware/Csrf.middleware";
import { verify } from "jsonwebtoken";

interface LoginInput {
  email: string;
  password: string;
}

interface SignupInput {
  name: string;
  email: string;
  photo: string;
  password: string;
  passwordConfirm: string;
}

//TODO: Make parse Mongoose errors
export const resolvers = {
  Mutation: {
    error: () => {
      throw new ApolloError("Test error");
    },
    getCsrf: (_: any, args: any, ctx: any) => {
      try {
        //console.log(JSON.stringify(ctx.req.body));
        csrfProtectionGraphQL(ctx.req, ctx.res);
        return ctx.req.csrfToken();
      } catch (err) {
        //console.log("ERROR ", err.message);
        //throw new ApolloError(err.message);
        return ctx.req.csrfToken();
      }
    },
    isCsrf: (_: any, { token }: { token: string }, ctx: any) => {
      try {
        ctx.req.body._csrf = token;
        //console.log("BODY", ctx.req.body);
        csrfProtectionGraphQL(ctx.req, ctx.res);

        return true;
      } catch (err) {
        //console.log("ERROR ", err.message);
        //throw new ApolloError(err.message);
        return false;
      }
    },
    signup: async (_: any, { input }: { input: SignupInput }, ctx: any) => {
      try {
        /* const next = (err: Error) => {
          throw err;
        };
        csrfProtection(ctx.req, ctx.res, next); */

        const { name, email, password, photo, passwordConfirm } = input;

        const user = await UserModel.create({
          name: name,
          email: email,
          role: "user",
          photo: photo,
          password: password,
          passwordConfirm: passwordConfirm,
        });

        //createAndSendToken(user, 201, req, res);
        const token = signToken(user._id);

        setCookieWithToken(ctx.req, ctx.res, token);

        hideUserPassword(user);

        return user;
      } catch (error) {
        const message = parseMongooseErrorGraphQL(error);
        throw new ApolloError(message || `Sign up error ${error.message}`);
      }
    },
    login: async (_: any, { input }: { input: LoginInput }, ctx: any) => {
      try {
        /* TODO VALIDATE FORM DATA */
        /* if (!email || !password) {
              return next(
                new AppError("Please tell us your email and password...", 401)
              );
            } */

        const { email, password } = input;

        //console.log(`${email} ||| ${password}`);

        const user = await UserModel.findOne({ email: email }).select(
          "+password"
        );

        /* console.log(
          `USER - ${user ? user.name : "no user"} | ${
            user ? user.password : ""
          }`
        );
 */
        if (!user || !(await user.correctPassword(password, user.password))) {
          throw new AuthenticationError("Incorrect email or password...");
        }

        const token = signToken(user._id);

        setCookieWithToken(ctx.req, ctx.res, token);

        hideUserPassword(user);

        return user;
      } catch (error) {
        throw new ApolloError(`Login error ${error.message}`);
      }
    },
    logout: (_: any, __: any, ctx: any) => {
      try {
        ctx.res.cookie("jwt", "loggedout", {
          expires: new Date(Date.now() + 10 * 1000),
          httpOnly: true,
        });

        return true;
      } catch (error) {
        throw new ApolloError(`Log out error ${error.message}`);
      }
    },
    authUser: async (_: any, attrs: any, ctx: any) => {
      try {
        /* if (ctx.req.cookies.jwt) {
          // VERIFY TOKEN
          const decoded = await verify(
            ctx.req.cookies.jwt,
            process.env.JWT_SECRET
          );

          // CHECK IF USER EXISTS
          const user = await UserModel.findById(decoded.id);

          if (!user) throw new Error("");

          // CHECK IF USER CHANGED PASSWORD AFTER THE TOKEN WAS ISSUED
          if (user.changedPasswordAfter(decoded.iat)) throw new Error("");

          // THERE IS A LOGGED IN USER
          //(req as IUserRequest).user = user;
          return user;
        } */
        return {
          _id: "1243dtr2355r34t",
          name: "Lizzy Waive",
          email: "lizzy@mainModule.ru",
          role: "user",
          photo: "lizzy-2.jpg",
        };
      } catch (error) {
        if (error.name === "JsonWebTokenError") {
          console.log(
            "[DEV_INFO] JsonWebTokenError",
            ctx.req.cookies.jwt,
            process.env.JWT_SECRET
          );
        } else if (error.name === "TokenExpiredError") {
          console.log(
            "[DEV_INFO] TokenExpiredError",
            ctx.req.cookies.jwt,
            process.env.JWT_SECRET
          );
        }
        throw new AuthenticationError("You are not authorized...");
      }
    },
  },
};
