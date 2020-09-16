import React from "react";
//import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
//import { connect } from "react-redux";
import { Link } from "react-router-dom";

function NavUserBtnWithMenu({ userButton, onLogOutUser }: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogOutButtonClick = () => {
    handleClose();
    onLogOutUser();
  };

  const userBtn = React.cloneElement(userButton, {
    onClick: handleClick,
    "aria-controls": "simple-menu",
    "aria-haspopup": "true",
  });

  /* <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Open Menu
      </Button> */
  return (
    <>
      {userBtn}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/user">My account</Link>
        </MenuItem>
        <MenuItem onClick={onLogOutButtonClick}>Logout</MenuItem>
      </Menu>
    </>
  );
}

/* const mapDispatchToProps = (dispatch: any) => {
  return {
    logOutUser: () =>
      dispatch({
        type: "LOG_OUT_USER",
      }),
  };
}; */

//export default connect(null, mapDispatchToProps)(NavUserBtnWithMenu);
export default NavUserBtnWithMenu;
