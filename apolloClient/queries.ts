import gql from "graphql-tag";

export const ALERT = gql`
  query getAlert {
    alert @client
  }
`;

export const HIDE_ALERT = gql`
  mutation hideAlert {
    hideAlert @client
  }
`;

export const SHOW_ALERT = gql`
  mutation showAlert($message: String!) {
    showAlert(message: $message) @client
  }
`;

export const GET_CSRF = gql`
  mutation getCsrf {
    getCsrf
  }
`;
