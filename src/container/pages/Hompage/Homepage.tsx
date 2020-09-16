import React, { useEffect, useRef, MutableRefObject, useState } from "react";
//import image from "../../../static/img/tour-1-cover.jpg";
import { sendGetWithJsonResponse } from "utils-library-lost/Fetch/Fetch";
import { relative } from "path";

//import Anchor from '../../../component/UI/Anchor/Anchor';
import { ITourData } from "./../../../data/tour";
import NCard from "../../../component/Card/NCard";

interface HomepageProps {}

const getCards = (tours: ITourData[]) => {
  if (tours) {
    return tours.map((tour, index) => {
      return <NCard key={tour.name + index} tour={tour} />;
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

  return <>{cards}</>;
};
export default React.memo(Homepage);
