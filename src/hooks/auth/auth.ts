import { useApolloClient, useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

//check if exists saved user in query cache
//check if exists saved user in local storage
//save user to query cache
//send request to isLogIn

export const AUTH_USER = gql`
  mutation {
    authUser {
      name
      email
      photo
    }
  }
`;

export const useAuthUser = () => {
  const client = useApolloClient();

  let userData = client.readQuery({
    query: AUTH_USER,
  });

  if (!userData) {
    userData = localStorage.get("natours_user");

    userData = userData ? JSON.parse(userData) : userData;

    if (userData) {
      client.writeQuery({
        query: AUTH_USER,
        data: {
          authUser: {
            ...userData,
          },
        },
      });
    }
  }

  const { data, loading, error } = useQuery(AUTH_USER, {
    skip: userData ? true : false,
  });

  return {
    data: userData || data,
    loading: loading,
    error: error,
  };
};
