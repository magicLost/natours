import { gql } from "apollo-server-express";

const userTypes = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    role: String!
    photo: String!
    password: String
    passwordConfirm: String

    passwordChangedAt: String
    passwordResetToken: String
    passwordResetExpires: String
    active: Boolean
  }
`;

export const schema = gql`
  ${userTypes}

  extend type Query {
    users: [User!]!
    user(id: ID!): User!
  }
`;
