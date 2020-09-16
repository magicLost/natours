import { gql } from "apollo-server-express";

const reviewTypes = gql`
  type Review {
    _id: ID!
    review: String!
    rating: Float!
    createdAt: String!
    tour: Tour
    user: User
  }
`;

export const schema = gql`
  ${reviewTypes}

  extend type Query {
    reviews: [Review!]!
    review(id: ID!): Review!
    reviewsByUser(userId: ID!): [Review!]!
    reviewsByTour(tourId: ID!): [Review!]!
  }
`;
