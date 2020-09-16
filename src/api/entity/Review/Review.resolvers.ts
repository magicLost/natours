import { ApolloError } from "apollo-server-express";
import ReviewModel from "./Review.model";

export const resolvers = {
  Query: {
    reviews: async (_: any, __: any, ctx: any) => {
      //ctx - context from server init
      try {
        const reviews = await ReviewModel.find();
        return reviews;
      } catch (err) {
        throw new ApolloError(err.message || err.toString());
      }
    },
    review: async (_: any, { id }: { id: string }, ctx: any) => {
      try {
        const review = await ReviewModel.findById(id);

        return review;
      } catch (err) {
        throw new ApolloError(err.message || err.toString());
      }
    },
    reviewsByUser: async (_: any, { userId }: { userId: string }, ctx: any) => {
      try {
        const reviews = await ReviewModel.find({
          user: userId,
        });

        return reviews;
      } catch (err) {
        throw new ApolloError(err.message || err.toString());
      }
    },

    reviewsByTour: async (_: any, { tourId }: { tourId: string }, ctx: any) => {
      try {
        const reviews = await ReviewModel.find({
          tour: tourId,
        });

        return reviews;
      } catch (err) {
        throw new ApolloError(err.message || err.toString());
      }
    },
  },
  /* Mutation: {}, */
};
