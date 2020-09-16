import React, { useState, useEffect } from "react";
//import classes from './TourPage.module.scss';
//import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { sendGetWithJsonResponse } from "utils-library-lost/Fetch/Fetch";
import Tour from "../../../component/Tour/Tour";
import { ITourData } from "../../../component/Tour/Tour";

interface TourPageProps {}

/*const useStyles = makeStyles({
    root: {
      display: "block",
    },
});*/

interface TourPageProps {
  match?: { params: { slug: string } };
}

const TourPage = (props: TourPageProps) => {
  //const classes = useStyles();
  const [tour, setTour] = useState<ITourData>();
  //const fetch: React.MutableRefObject<Fetch | undefined> = useRef(undefined);

  useEffect(() => {
    //fetch.current = new Fetch();

    const fetchData = async () => {
      //if (fetch.current === undefined) throw new Error("No Fetch");
      let result = await sendGetWithJsonResponse<{ data: { tour: ITourData } }>(
        `http://localhost:3000/api/v1/tours/slug/${
          props.match ? props.match.params.slug : ""
        }`
      );
      setTour(result.data.tour);
    };
    fetchData();
  }, []);

  console.log(`[RENDER] TourPage`, tour);

  const tourElement = tour ? <Tour tour={tour} /> : null;

  return tourElement;
};

export default TourPage;
