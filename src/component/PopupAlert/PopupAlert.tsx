import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
//import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Alert from "@material-ui/lab/Alert";
//import { makeStyles, Theme } from "@material-ui/core/styles";
import { IAlertState } from "../../store/reducer/alert";
import { connect } from "react-redux";

/* function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
 */
/* const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
})); */

export const PopupAlert = ({ isShow, hideAlert, type, message }: any) => {
  //const classes = useStyles();

  console.log("[RENDER PopupAlert]", isShow, type, message);

  return (
    <Snackbar
      open={isShow}
      autoHideDuration={6000}
      onClose={hideAlert}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert variant="filled" onClose={hideAlert} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(PopupAlert);
