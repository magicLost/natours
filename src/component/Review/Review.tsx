import React from "react";
import "./Review.css";
import { IReviewData } from "./../Tour/Tour";

interface ReviewProps {
  review: IReviewData;
}

const getRating = (reviewId: string, rating: number) => {
  return [1, 2, 3, 4, 5].map((value) => {
    return (
      <svg
        key={`rating_${rating}_${value}_${reviewId}`}
        className={`reviews__star reviews__star--${
          rating >= value ? "active" : "inactive"
        }`}
      >
        <use xlinkHref="/img/icons/icons.svg#icon-star"></use>
      </svg>
    );
  });
};

const Review = ({ review }: ReviewProps) => {
  const ratings = getRating(review._id, review.rating);
  return (
    <div className="reviews__card">
      <div className="reviews__avatar">
        <img
          className="reviews__avatar-img"
          src={`/img/users/${review.user.photo}`}
          alt="Lourdes Browning"
        />
        <h6 className="reviews__user">{review.user.name}</h6>
      </div>
      <p className="reviews__text">{review.review}</p>
      <div className="reviews__rating">{ratings}</div>
    </div>
  );
};

export default Review;
