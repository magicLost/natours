import { useMemo } from "react";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink, createHttpLink } from "apollo-link-http";
import gql from "graphql-tag";
import { createPersistedQueryLink } from "apollo-link-persisted-queries";
import { setContext } from "apollo-link-context";
//@ts-ignore
import merge from "lodash.merge";
import { schema as mainSchema } from "./schema";
import { resolvers as mainResolvers } from "./resolvers";
import { ALERT } from "./queries";
import { sendPostWithJsonResponse } from "utils-library-lost/Fetch/Fetch";
//import { schema as userSchema } from "./component/Users/Users.schema";
//import { resolvers as userResolvers } from "./component/Users/Users.resolvers";

//${userSchema}
const typeDefs = gql`
  ${mainSchema}
`;

let apolloClient = undefined;
//userResolvers
export const resolvers = merge({}, mainResolvers);

const isServer = typeof window === "undefined";

let token = "";

const withCsrf = async (_, { headers }) => {
  try {
    //let token = localStorage.getItem("csrf_token");

    console.log("[WITH_CSRF]", token);

    if (!token) {
      const response = await fetch("http://localhost:3000/csrf", {
        method: "post",
      });

      if (response.status !== 200) {
        throw new Error("Bad csrf response");
      }

      const data = await response.json();

      token = data.token;

      //localStorage.setItem("csrf_token", token);
    }

    console.log("[WITH_CSRF - request]", token);

    return {
      headers: {
        ...headers,
        "CSRF-Token": token,
      },
    };
  } catch (error) {
    console.error(error.message);
    return {
      headers,
    };
  }
};

const csrfLink = setContext(withCsrf);

const httpLink = new HttpLink({
  uri: isServer
    ? "http://localhost:3005/graphql"
    : "http://localhost:3000/graphql", // Server URL (must be absolute)
  //credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
});

const link = isServer ? httpLink : csrfLink.concat(httpLink);

/*  */
function createApolloClient() {
  /* new ApolloClient({
  ssrMode: typeof window === "undefined",
  link,
  cache,
  resolvers,
  typeDefs,
}); */

  return new ApolloClient({
    ssrMode: isServer,
    link: link,
    cache: new InMemoryCache(),
    resolvers,
    typeDefs,
  });
}

//const link = new HttpLink({ uri: "http://localhost:3000/graphql" });
/* const link = createPersistedQueryLink({ useGETForHashedQueries: true }).concat(
  createHttpLink({ uri: "http://localhost:3005/graphql" })
); */

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  _apolloClient.writeQuery({
    query: ALERT,
    data: { alert: { isShow: false, message: "No message" } },
  });

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
