import React, { useState, useEffect } from "react";
import classes from "./Alert.module.scss";
import { IAlertState } from "../../store/reducer/alert";
import { connect } from "react-redux";

export type TAlertType = "SUCCESS" | "ERROR" | "LOADING";

interface AlertProps {
  type?: TAlertType;
  isShow?: boolean;
  message?: string;
  hideAlert?: () => void | undefined;
}

export const Alert = ({ type, isShow, message, hideAlert }: AlertProps) => {
  //const [show, setShow] = useState(false);

  useEffect(() => {
    /* if (show === false && isShow === true) setShow(true);

    if (show === true && isShow === false) {
      setTimeout(() => {
        setShow(false);
      }, 1500);
    } */

    if (isShow === true) {
      setTimeout(() => {
        if (hideAlert === undefined) throw new Error("No hideAlert in Alert");
        hideAlert();
      }, 1500);
    }
  }, [isShow]);

  const typeClass: string = `alert--${(type as any).toLowerCase()}`;

  let alertClasses = [classes.alert, classes[typeClass]].join(" ");
  alertClasses += isShow
    ? ` ${classes["alert--show-translateY"]}`
    : ` ${classes["alert--hide-translateY"]}`;

  console.log("[RENDER ALERT", type, isShow, message);

  return <div className={alertClasses}>{message}</div>;
};

const mapStateToProps = (state: { alert: IAlertState }) => {
  return {
    isShow: state.alert.isShow,
    type: state.alert.type,
    message: state.alert.message,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    hideAlert: () =>
      dispatch({
        type: "HIDE_ALERT",
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
