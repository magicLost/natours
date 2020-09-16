import { ApolloError, AuthenticationError } from "apollo-server-express";
import UserModel from "./User.model";
import { isPermission } from "./../Auth/Auth.model";

export const resolvers = {
  Query: {
    users: async (_: any, __: any, ctx: any) => {
      //ctx - context from server init
      /* if (!isPermission(["admin"], ctx.req)) {
        throw new AuthenticationError("You not authorized to use this...");
      } */
      try {
        const tours = await UserModel.find();
        return tours;
      } catch (err) {
        throw new ApolloError(err.message || err.toString());
      }
    },
    user: async (_: any, { id }: { id: string }, ctx: any) => {
      if (!isPermission(["admin"], ctx.req)) {
        throw new AuthenticationError("You not authorized to use this...");
      }
      try {
        const tour = await UserModel.findById(id);
        return tour;
      } catch (err) {
        throw new ApolloError(err.message || err.toString());
      }
    },
  },
  /* Mutation: {}, */
};
