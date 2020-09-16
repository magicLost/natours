import { ApolloError } from "apollo-server-express";
import TourModel, { ITourModel } from "./Tour.model";
import { csrfProtectionGraphQL } from "./../../../site/middleware/Csrf.middleware";

interface IConnection {
  //totalCount: number,
  edges: ITourModel[];
  pageInfo: PageInfo;
}

type PageInfo = {
  endCursor: number;
  hasNextPage: boolean;
};

export const resolvers = {
  Query: {
    /* tours: async (
      _: any,
      { limit }: { limit: number },
      ctx: any,
      info: any
    ) => {
      //ctx - context from server init
      try {
        //info.cacheControl.setCacheHint({ maxAge: 240, scope: "PRIVATE" });
        let query = TourModel.find();
        query = limit ? query.limit(limit) : query;
        const tours = await query;
        return tours;
      } catch (err) {
        throw new ApolloError(err.message || err.toString());
      }
    }, */
    tours: async (
      _: any,
      { limit, cursor }: { limit: number; cursor?: number },
      ctx: any,
      info: any
    ): Promise<IConnection> => {
      //ctx - context from server init
      try {
        //info.cacheControl.setCacheHint({ maxAge: 240, scope: "PRIVATE" });
        console.log("TOURS", ctx.res.headersSent);

        let query;

        if (cursor) {
          query = TourModel.find({ _timestamp: { $lt: cursor } })
            .sort({ _timestamp: -1 })
            .limit(limit + 1);
        } else {
          query = TourModel.find()
            .sort({ _timestamp: -1 })
            .limit(limit + 1);
        }

        const tours = await query;

        console.log("TOURS", tours.length, ctx.res.headersSent);

        const hasNextPage = tours.length > limit;

        if (hasNextPage) tours.pop();

        //console.log("TOURS", tours);

        return {
          edges: tours,
          pageInfo: {
            endCursor: tours[tours.length - 1]._timestamp,
            hasNextPage,
          },
        };
      } catch (err) {
        throw new ApolloError(err.message || err.toString());
      }
    },
    tour: async (_: any, { id }: { id: string }, ctx: any) => {
      try {
        //csrfProtectionGraphQL(ctx.req, ctx.res);

        /* IF WE WANNA ADD LIMIT TO SHOWN GUIDES */
        //const tour = await TourModel.findById(id, { guides: { $slice: 2 } });
        const tour = await TourModel.findById(id);
        return tour;
      } catch (err) {
        throw new ApolloError(err.message || err.toString());
      }
    },
    test: async (_: any, { id }: { id: string }, ctx: any) => {
      try {
        /* IF WE WANNA ADD LIMIT TO SHOWN GUIDES */
        //const tour = await TourModel.findById(id, { guides: { $slice: 2 } });
        const tour = await TourModel.find({ id: { gte: id } });
        return tour;
      } catch (err) {
        throw new ApolloError(err.message || err.toString());
      }
    },
  },
};
