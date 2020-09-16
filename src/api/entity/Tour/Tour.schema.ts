import { gql } from "apollo-server-express";

const tourTypes = gql`
  interface IStartLocation {
    type: String!
    coordinates: [Float!]!
    address: String!
    description: String!
  }

  type StartLocation implements IStartLocation {
    type: String!
    coordinates: [Float!]!
    address: String!
    description: String!
  }

  type Location implements IStartLocation {
    type: String!
    coordinates: [Float!]!
    address: String!
    description: String!
    day: Int!
  }

  type PageInfo {
    endCursor: Float!
    hasNextPage: Boolean!
  }

  type Connection {
    edges: [Tour!]!
    pageInfo: PageInfo!
  }

  type Tour {
    _id: ID!
    _timestamp: Float!
    name: String!
    slug: String!
    duration: Int!
    maxGroupSize: Int!
    difficulty: String!

    ratingsAverage: Float!
    ratingsQuantity: Int!

    price: Int!
    priceDiscount: Int!

    summary: String!
    description: String!

    imageCover: String!
    images: [String!]!

    createdAt: String!
    startDates: [String!]!
    secretTour: Boolean!

    startLocation: StartLocation!
    locations: [Location!]!

    guides: [User!]!
  }
`;

export const schema = gql`
  ${tourTypes}

  type Query {
    tours(limit: Int!, cursor: Float): Connection!
    tour(id: ID!): Tour!
    test(id: ID!): [Tour!]!
  }
`;
