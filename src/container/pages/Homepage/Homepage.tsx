import React, { useEffect, useRef, MutableRefObject, useState } from "react";
import classes from "./Homepage.module.scss";
//import image from "../../../static/img/tour-1-cover.jpg";
import { sendGetWithJsonResponse } from "utils-library-lost/Fetch/Fetch";
import TourCard from "../../../component/TourCard/TourCard";
import MapBox from "../../../component/MapBox/MapBox";
import { relative } from "path";
//import Anchor from '../../../component/UI/Anchor/Anchor';
import { ITourData } from "./../../../component/Tour/Tour";

interface HomepageProps {}

const getCards = (tours: ITourData[]) => {
  if (tours) {
    return tours.map((tour, index) => {
      return <TourCard key={classes["card-container"] + index} tour={tour} />;
    });
  }

  return null;
};

const Homepage = ({}: HomepageProps) => {
  const [tours, setTours] = useState<ITourData[]>([]);
  //const fetch: MutableRefObject<Fetch | undefined> = useRef(undefined);

  useEffect(() => {
    //fetch.current = new Fetch();

    const fetchData = async () => {
      let alltours = await sendGetWithJsonResponse<{
        data: { docs: ITourData[] };
      }>("http://localhost:3000/api/v1/tours");

      setTours(alltours.data.docs);
    };
    fetchData();
  }, []);

  const cards = getCards(tours);

  console.log("[RENDER] HOMEPAGE ");

  return (
    <>
      <section className={classes["card-container"]}>{cards}</section>
    </>
  );
};
export default Homepage;
