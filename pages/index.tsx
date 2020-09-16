import React from "react";
import Tours, { ALL_TOURS } from "./../src/component/Tours/Tours";
import Link from "next/link";
import { initializeApollo } from "../apolloClient";
import Layout from "../src/container/page/Layout/Layout";

function Homepage() {
  console.log("Render Homepage");

  return (
    <Layout title="Natours - super, puper tours...">
      <Link href="/test">
        <a>Test page.</a>
      </Link>

      <Tours />
    </Layout>
  );
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  console.log("SERVER REQUEST");

  await apolloClient.query({
    query: ALL_TOURS,
    //variables: allPostsQueryVars,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
    //unstable_revalidate: 1,
  };
}

export default Homepage;
