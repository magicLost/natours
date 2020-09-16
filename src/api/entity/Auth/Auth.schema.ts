import { gql } from "apollo-server-express";

const authTypes = gql`
  input LoginInput {
    email: String!
    password: String!
  }
  input SignupInput {
    name: String!
    email: String!
    photo: String
    password: String!
    passwordConfirm: String!
  }
  input UpdatePasswordInput {
    currentPassword: String!
    newPassword: String!
    confirmNewPassword: String!
  }
`;

export const schema = gql`
  ${authTypes}

  type Mutation {
    login(input: LoginInput!): User!
    signup(input: SignupInput!): User!
    authUser: User
    logout: Boolean!
    forgotPassword(email: String!): String!
    # user send request with token in query
    resetPassword: User!
    updatePassword(input: UpdatePasswordInput): User!
    getCsrf: String!
    isCsrf(token: String!): Boolean!
    error: Boolean
  }
`;
