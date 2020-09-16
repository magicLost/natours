import React from "react";
import "./OverviewBox.css";

export interface IGuideData {}

type TOverviewType = "FACT" | "GUIDE";

interface OverviewBoxProps {
  type: TOverviewType;
  label: string;
  text: string;
  pathToImage: string;
}

const getImage = (type: TOverviewType, pathToImage: string) => {
  if (type === "FACT") {
    return (
      <svg className="overview-box__icon">
        <use xlinkHref={pathToImage}></use>
      </svg>
    );
  } else if ((type = "GUIDE")) {
    return (
      <img
        className="overview-box__img"
        src={pathToImage}
        alt={"Photo portrait of guide"}
      />
    );
  } else {
    throw new Error(`Unknown type - ${type}`);
  }
};

const OverviewBox = ({ type, label, text, pathToImage }: OverviewBoxProps) => {
  const image = getImage(type, pathToImage);

  return (
    <div className="overview-box__detail">
      {image}
      <span className="overview-box__label">{label}</span>
      <span className="overview-box__text">{text}</span>
    </div>
  );
};

export default OverviewBox;
