import React from "react";
//import cx from "clsx";
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import image from "./../../static/tours/tour-1-cover.jpg";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import ChevronRightRounded from "@material-ui/icons/ChevronRightRounded";
import Button from "@material-ui/core/Button";
//import Link from "@material-ui/core/Link";
import icon from "../../static/images/icons/icons.svg";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { ITourData } from "./../../data/tour";
import { Link } from "react-router-dom";

interface INCardProps {
  tour: ITourData;
}

const useStyles = makeStyles(() => ({
  root: {
    overflow: "initial",
    maxWidth: 350,
    backgroundColor: "#fff",
  },
  title: {
    marginBottom: 0,
    marginTop: 0,
  },
  rateValue: {
    //fontWeight: "bold",
    marginTop: 2,
  },
  content: {
    position: "relative",
    padding: "24px, 24px, 12px",
    margin: "-24% 16px 0",
    backgroundColor: "#fff",
    borderRadius: 4,
    boxShadow:
      "0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)",
  },
  favorite: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  locationIcon: {
    marginRight: 4,
    fontSize: 18,
  },
  cardMedia: {
    display: "block",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",

    width: "100%",
    height: "0px",
    paddingBottom: "56.25%",
    backgroundColor: "rgba(0,0,0,0.08)",
    borderRadius: 4,
  },
  cardIcon: {
    width: "17px",
    height: "17px",
    fill: "#55c57a",
  },
  cta: {
    marginTop: 12,
    textTransform: "initial",
    color: "#55c57a",
  },
  shevronIco: {
    fill: "#55c57a",
  },
}));

const getDetail = (iconClass: any, iconId: string, text: string) => {
  return (
    <Box
      key={iconClass + iconId}
      flexBasis={"40%"}
      display={"flex"}
      justifyContent={"flex-start"}
      alignItems={"center"}
      paddingX={1}
      paddingY={1}
    >
      <svg className={iconClass}>
        <use xlinkHref={`${icon}#icon-${iconId}`}></use>
      </svg>
      <Typography color={"textSecondary"} variant={"body2"}>
        &nbsp;{text}
      </Typography>
    </Box>
  );
};

const getPriceDetail = (iconClass: any, price: number) => {
  return (
    <Box
      key={iconClass + price}
      flexBasis={"90%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      paddingY={1}
    >
      <AttachMoneyIcon className={iconClass} />
      <Typography color={"textSecondary"} variant={"body2"}>
        <strong>{`${price}`}</strong>
        {` per person`}
      </Typography>
    </Box>
  );
};

const iconIds = ["map-pin", "calendar", "flag", "user"];

const NCard = ({ tour }: INCardProps) => {
  const styles = useStyles();

  const details = iconIds.map((iconId, index) => {
    let text = "";
    switch (index) {
      case 0:
        text = tour.startLocation.description;
        break;
      case 1:
        text = new Date(tour.startDates[0]).toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        });
        break;
      case 2:
        text = `${tour.locations.length} stops`;
        break;
      case 3:
        text = `${tour.maxGroupSize} people`;
        break;
    }
    return getDetail(styles.cardIcon, iconId, text);
  });

  const priceDetail = getPriceDetail(styles.cardIcon, tour.price);

  details.push(priceDetail);

  return (
    <Box mb={5} mr={2} ml={2}>
      <Card elevation={0} className={styles.root}>
        <CardMedia
          image={`/images/tours/${tour.imageCover}`}
          className={styles.cardMedia}
        />
        <CardContent className={styles.content}>
          <h3 className={styles.title}>{tour.name}</h3>
          <Box
            color={"lightgray"}
            display={"flex"}
            alignItems={"center"}
            mb={1}
          >
            <span>{`${tour.difficulty} ${tour.duration}-day tour`}</span>
          </Box>
          <Box display={"flex"} alignItems={"center"} mb={1}>
            <Rating
              name={"rating"}
              value={Math.round(tour.ratingsAverage)}
              size={"small"}
              readOnly
            />
            <Typography
              variant={"body2"}
              color={"textSecondary"}
              className={styles.rateValue}
            >
              <strong>&nbsp;{tour.ratingsAverage}</strong>
              <span>{` rating(${tour.ratingsQuantity})`}</span>
            </Typography>
          </Box>
          <Box pb={2} pt={1}>
            <Typography color={"textSecondary"} variant={"body2"}>
              {tour.summary}
            </Typography>
          </Box>
          <Divider light />
          <Box
            paddingY={1}
            display={"flex"}
            justifyContent={"center"}
            flexWrap={"wrap"}
          >
            {details}
          </Box>
          <Divider light />
          <Box mb={-2}>
            <Button
              component={Link}
              to={`/tour/${tour.slug}`}
              color={"primary"}
              className={styles.cta}
              fullWidth
            >
              Find Out More
              <ChevronRightRounded className={styles.shevronIco} />
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default NCard;
