import React from "react";
import "./Tour.css";
import Review from "./Review/Review";
import OverviewBox from "./OverveiwBox/OverviewBox";
//import MapBox from "./MapBox/MapBox";

export interface ILocation {
  _id: string;
  description: string;
  type: string;
  coordinates: number[];
  day: number;
}

export interface ITourData {
  startLocation: {
    description: string;
    type: string;
    coordinates: number[];
    address: string;
  };
  slug: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  images: string[];
  startDates: string[];
  _id: string;
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: string;
  guides: IUserData[]; //array of guides ids
  price: number;
  summary: string;
  description: string;
  imageCover: string; // path to image
  locations: ILocation[];
  reviews: IReviewData[];
}

export interface IReviewData {
  user: {
    _id: string;
    name: string;
    photo: string;
  };
  _id: string;
  review: string;
  tour: string;
  rating: number;
}

export interface IUserData {
  name: string;
  photo: string;
  role: string;
}

interface TourProps {
  tour: ITourData;
}

const getFactsOverviewBoxes = (tour: ITourData) => {
  const facts = [];

  facts.push(
    <OverviewBox
      key={`FACT_${1}`}
      type={"FACT"}
      label={"Next date"}
      text={new Date(tour.startDates[0]).toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      })}
      pathToImage={"/img/icons/icons.svg#icon-calendar"}
    />
  );

  facts.push(
    <OverviewBox
      key={`FACT_${2}`}
      type={"FACT"}
      label={"Difficulty"}
      text={tour.difficulty}
      pathToImage={"/img/icons/icons.svg#icon-trending-up"}
    />
  );

  facts.push(
    <OverviewBox
      key={`FACT_${3}`}
      type={"FACT"}
      label={"Participants"}
      text={tour.maxGroupSize.toString()}
      pathToImage={"/img/icons/icons.svg#icon-user"}
    />
  );

  facts.push(
    <OverviewBox
      key={`FACT_${4}`}
      type={"FACT"}
      label={"Rating"}
      text={`${tour.ratingsAverage}/5`}
      pathToImage={"/img/icons/icons.svg#icon-star"}
    />
  );

  return (
    <div className="overview-box__group">
      <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>
      {facts}
    </div>
  );
};

const getGuidesOverviewBoxes = (guides: IUserData[]) => {
  const guideElements = guides.map((guide, index) => {
    return (
      <OverviewBox
        key={`GUIDE_${index}`}
        type={"GUIDE"}
        label={guide.role === "guide" ? "Tour guide" : "Lead guide"}
        text={guide.name}
        pathToImage={`/img/users/${guide.photo}`}
      />
    );
  });

  return (
    <div className="overview-box__group">
      <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
      {guideElements}
    </div>
  );
};

const getDescription = (description: string) => {
  const descArray = description.split("\n");

  return descArray.map((text, index) => {
    return (
      <p key={`description__text_${index}`} className="description__text">
        {text}
      </p>
    );
  });
};

const getImages = (tourName: string, images: string[]) => {
  return images.map((path, index) => {
    return (
      <div key={`${path}_${index}`} className="picture-box">
        <img
          className={`picture-box__img picture-box__img--${index + 1}`}
          src={`/img/tours/${path}`}
          alt={`${index + 1} photo of ${tourName} tour`}
        />
      </div>
    );
  });
};

const getReviews = (reviews: IReviewData[]) => {
  return reviews.map((review, index) => {
    return <Review key={`review_${review._id}_${index}`} review={review} />;
  });
};

const Tour = ({ tour }: TourProps) => {
  const factsOverviewBoxes = getFactsOverviewBoxes(tour);
  const guidesOverviewBoxes = getGuidesOverviewBoxes(tour.guides);
  const descriptionParagraphs = getDescription(tour.description);
  const images = getImages(tour.name, tour.images);
  const reviews = getReviews(tour.reviews);

  return (
    <>
      <section className="section-header">
        <div className="header__hero">
          <div className="header__hero-overlay">&nbsp;</div>
          <img
            className="header__hero-img"
            src={`/img/tours/${tour.imageCover}`}
            alt={`Image of tour ${tour.name}`}
          />
        </div>

        <div className="heading-box">
          <h1 className="heading-primary">
            <span>{`${tour.name} tour`}</span>
          </h1>
          <div className="heading-box__group">
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use xlinkHref="/img/icons/icons.svg#icon-clock"></use>
              </svg>
              <span className="heading-box__text">{`${tour.duration} days`}</span>
            </div>
            <div className="heading-box__detail">
              <svg className="heading-box__icon">
                <use xlinkHref="/img/icons/icons.svg#icon-map-pin"></use>
              </svg>
              <span className="heading-box__text">
                {tour.startLocation.description}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section-description">
        <div className="overview-box">
          <div>
            {factsOverviewBoxes}

            {guidesOverviewBoxes}
          </div>
        </div>
        <div className="description-box">
          <h2 className="heading-secondary ma-bt-lg">
            {`About ${tour.name} tour`}
          </h2>

          {descriptionParagraphs}
        </div>
      </section>

      <section className="section-pictures">{images}</section>

      {/*  <section className="section-map">
        <MapBox locations={tour.locations} />
      </section> */}

      <section className="section-reviews">
        <div className="reviews">{reviews}</div>
      </section>

      <section className="section-cta">
        <div className="cta">
          <div className="cta__img cta__img--logo">
            <img src="/img/logo-white.png" alt="Natours logo" />
          </div>
          <img
            className="cta__img cta__img--1"
            src="/img/tours/tour-2-2.jpg"
            alt="Tour picture"
          />
          <img
            className="cta__img cta__img--2"
            src="/img/tours/tour-2-3.jpg"
            alt="Tour picture"
          />
          <div className="cta__content">
            <h2 className="heading-secondary">What are you waiting for?</h2>
            <p className="cta__text">
              7 days. 1 adventure. Infinite memories. Make it yours today!
            </p>
            <a className="btn btn--green span-all-rows" href="/login">
              Log in to book tour
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Tour;
