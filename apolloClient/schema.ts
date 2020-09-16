import gql from "graphql-tag";

export const schema = gql`
  extend type User {
    age: Int
  }

  type Alert {
    isShow: Boolean!
    message: String!
  }

  extend type Query {
    alert: Alert!
  }

  extend type Mutation {
    showAlert(message: String!): Alert
    hideAlert: Alert
  }
`;
