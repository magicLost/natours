import { gql } from "apollo-server-express";
import merge from "lodash.merge";
import { tourSchema, tourResolvers } from "./api/entity/Tour";
import { userSchema, userResolvers } from "./api/entity/User";
import { authSchema, authResolvers } from "./api/entity/Auth";
import { reviewSchema, reviewResolvers } from "./api/entity/Review";

/* FIRST SCHEMA HAVE TYPE QUERY AND OTHERS MUST EXTEND TYPE QUERY */

export const schema = gql`
  ${tourSchema}

  ${userSchema}

  ${authSchema}

  ${reviewSchema}
`;

export const resolvers = merge(
  {},
  tourResolvers,
  userResolvers,
  authResolvers,
  reviewResolvers
);
