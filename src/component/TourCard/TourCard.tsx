import React from "react";
import classes from "./TourCard.module.scss";
import { Link } from "react-router-dom";
import commonClasses from "./../../CommonClasses.module.scss";
import pathToIcons from "./../../static/img/icons/icons.svg";
import Tour, { ITourData } from "./../Tour/Tour";

interface TourCardProps {
  tour: ITourData;
}

const TourCard = ({ tour }: TourCardProps) => {
  return (
    <div className={classes["card"]}>
      <div className={classes["card__header"]}>
        <div className={classes["card__picture"]}>
          <div className={classes["card__picture-overlay"]}></div>
          <img
            src={`/img/tours/${tour.imageCover}`}
            alt={`Image of tour ${tour.name}`}
            className={classes["card__picture-img"]}
          />
        </div>

        <h3 className={commonClasses["heading-tertirary"]}>
          <span>{tour.name}</span>
        </h3>
      </div>
      <div className={classes["card__details"]}>
        <h4
          className={classes["card__sub-heading"]}
        >{`${tour.difficulty} ${tour.duration}-day tour`}</h4>
        <p className={classes["card__text"]}>{tour.summary}</p>
        <div className={classes["card__data"]}>
          <svg className={classes["card__icon"]}>
            <use xlinkHref={`${pathToIcons}#icon-map-pin`}></use>
          </svg>
          <span>{tour.startLocation.description}</span>
        </div>
        <div className={classes["card__data"]}>
          <svg className={classes["card__icon"]}>
            <use xlinkHref={`${pathToIcons}#icon-calendar`}></use>
          </svg>
          <span>
            {new Date(tour.startDates[0]).toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
        <div className={classes["card__data"]}>
          <svg className={classes["card__icon"]}>
            <use xlinkHref={`${pathToIcons}#icon-flag`}></use>
          </svg>
          <span>{`${tour.locations.length} stops`}</span>
        </div>
        <div className={classes["card__data"]}>
          <svg className={classes["card__icon"]}>
            <use xlinkHref={`${pathToIcons}#icon-user`}></use>
          </svg>
          <span>{`${tour.maxGroupSize} people`}</span>
        </div>
      </div>
      <div className={classes["card__footer"]}>
        <p>
          <span className={classes["card__footer-value"]}>{tour.price}</span>
          <span className={classes["card__footer-text"]}> per person</span>
        </p>
        <p className={classes["card__ratings"]}>
          <span className={classes["card__footer-value"]}>
            {tour.ratingsAverage}
          </span>
          <span
            className={classes["card__footer-text"]}
          >{` rating(${tour.ratingsQuantity})`}</span>
        </p>
        <Link
          to={`/tour/${tour.slug}`}
          className={[
            commonClasses["btn"],
            commonClasses["btn--green"],
            commonClasses["btn--small"],
            classes["card__btn"],
          ].join(" ")}
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default TourCard;
