import React, { useMemo } from "react";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { ApolloError } from "apollo-client";
import classes from "./Tours.module.scss";
import { ALERT, SHOW_ALERT, HIDE_ALERT } from "../../../apolloClient/queries";
import Button from "@material-ui/core/Button";

const limit = 4;

//age @client
const TOURS_FIELDS_FRAGMENT = gql`
  fragment ToursFields on Tour {
    name
    _id
    _timestamp
    guides {
      _id
    }
  }
`;

export const ALL_TOURS = gql`
  query getAllTours($cursor: Float) {
    tours(limit: 4, cursor: $cursor) {
      edges {
        ...ToursFields
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${TOURS_FIELDS_FRAGMENT}
`;

const getTours = (data: any, loading: boolean, error?: ApolloError) => {
  console.log("getTours");
  if (error) {
    return <h3>ERROR - {error.message}</h3>;
  } else if (loading) {
    return <h3>...Loading</h3>;
  } else {
    //console.log(data.tours.edges);
    return data.tours.edges.map((tour: any, index: number) => {
      return (
        <div key={tour._id} className={classes.tour}>
          {tour.name}
        </div>
      );
    });
  }
};

const Tours = () => {
  const { data: alertData, loading: alertLoading } = useQuery(ALERT);

  const [hideAlert] = useMutation(HIDE_ALERT);
  const [showAlert] = useMutation(SHOW_ALERT, {
    variables: {
      message: "Hello from alert.",
    },
  });

  console.log(alertData, alertLoading);

  const { data, loading, error, fetchMore } = useQuery(ALL_TOURS, {
    variables: {
      cursor: undefined,
    },
  });

  const onLoadMore = () =>
    fetchMore({
      variables: {
        cursor: data.tours.pageInfo.endCursor,
      },
      updateQuery: (previousResult: any, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.tours.edges;
        const pageInfo = fetchMoreResult.tours.pageInfo;

        return newEdges.length
          ? {
              // Put the new comments at the end of the list and update `pageInfo`
              // so we have the new `endCursor` and `hasNextPage` values
              tours: {
                __typename: previousResult.tours.__typename,
                edges: [...previousResult.tours.edges, ...newEdges],
                pageInfo,
              },
            }
          : previousResult;
      },
    });

  return (
    <>
      {useMemo(() => {
        return (
          <>
            <div className={classes.alert}>
              <h3>Alert</h3>
              <p>{alertData.alert.isShow ? "Show" : "Hide"}</p>
              <p>{alertData.alert.message}</p>
            </div>
            <Button onClick={hideAlert as any}>Hide alert</Button> |{" "}
            <Button onClick={showAlert as any}>Show alert</Button>
          </>
        );
      }, [alertData])}
      <div className={classes.container}>
        {useMemo(() => {
          return getTours(data, loading, error);
        }, [data, loading, error])}
      </div>
      {data && data.tours.pageInfo.hasNextPage && (
        <Button className={classes.button} onClick={onLoadMore}>
          Show more
        </Button>
      )}
    </>
  );
};

export default Tours;
