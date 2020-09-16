import React, { useEffect } from "react";
import Head from "next/head";
import { ApolloProvider } from "@apollo/react-hooks";
import { useApollo, initializeApollo } from "../apolloClient";
import { ALERT } from "../apolloClient/queries";

interface IAppProps {
  Component: React.FunctionComponent;
  pageProps: any;
}

export default function App({ Component, pageProps }: IAppProps) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}
