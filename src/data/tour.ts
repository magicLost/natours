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
