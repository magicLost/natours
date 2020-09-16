import React, { useState } from "react";
import { Marker, Popup } from "react-map-gl";

import classes from "./MarkerWithPopup.module.scss";

interface MarkerWithPopupProps {
  //key?: string;
  coordinates: number[];
  popupText: string;
  isShowPopupByDefault: boolean;
}

const MarkerWithPopup = ({
  coordinates,
  popupText,
  isShowPopupByDefault,
}: MarkerWithPopupProps) => {
  //`Day ${location.day}: ${location.description}`
  const [showPopup, setShowPopup] = useState(isShowPopupByDefault);

  return (
    <>
      <Marker
        latitude={coordinates[1]}
        longitude={coordinates[0]}
        offsetLeft={-16}
        offsetTop={-40}
      >
        <div onClick={() => setShowPopup(true)} className={"marker"}></div>
      </Marker>

      {showPopup && (
        <Popup
          latitude={coordinates[1]}
          longitude={coordinates[0]}
          closeButton={true}
          closeOnClick={true}
          onClose={() => setShowPopup(false)}
          //offsetLeft={-16}
          offsetTop={-30}
        >
          <p>{popupText}</p>
        </Popup>
      )}
    </>
  );
};

export default MarkerWithPopup;
