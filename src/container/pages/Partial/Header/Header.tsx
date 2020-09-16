import React from "react";
import classes from "./Header.module.scss";
import { Link } from "react-router-dom";
import logoWhite from "./../../../../static/img/logo-white.png";
import { connect } from "react-redux";
import { IUserData } from "../../../../store/reducer/auth";

interface HeaderProps {
  onShowLoginForm: () => void | undefined;
  onShowRegistrationForm: () => void | undefined;
  onLogout: (event: any) => Promise<any>;
  user?: IUserData;
}
export const Header = ({
  onShowLoginForm,
  onShowRegistrationForm,
  onLogout,
  user,
}: HeaderProps) => {
  const getAuthFragment = () => {
    if (user && user.name !== "") {
      const name = user.name.split(" ")[0];
      return (
        <>
          <button className={classes["nav__el"]} onClick={onLogout}>
            Log out
          </button>
          <a className={classes["nav__el"]} href="#">
            <img
              className={classes["nav__user-img"]}
              src={`/img/users/${user.photo}`}
              alt="User photo"
            />
            <span>{name}</span>
          </a>
        </>
      );
    } else {
      return (
        <>
          <button className={classes["nav__el"]} onClick={onShowLoginForm}>
            Login
          </button>
          <button
            className={[classes["nav__el"], classes["nav__el--cta"]].join(" ")}
            onClick={onShowRegistrationForm}
          >
            Sign up
          </button>
        </>
      );
    }
  };

  const authFragment = getAuthFragment();

  return (
    <header className={classes.Header}>
      <nav className={[classes.nav, classes["nav--tours"]].join(" ")}>
        <Link className={classes["nav__el"]} to="/">
          All tours
        </Link>
      </nav>
      <div className="header__logo">
        <img src={logoWhite} alt="Natours logo" />
      </div>
      <nav className={[classes.nav, classes["nav--user"]].join(" ")}>
        {authFragment}
      </nav>
    </header>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Header);
