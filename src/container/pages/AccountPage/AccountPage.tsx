import React from "react";
import classes from "./AccountPage.module.scss";
import { userSideMenu } from "../../../data/pages/account_page_data";

interface AccountPageProps {}

const getUserSideMenu = () => {
  const menuItems = userSideMenu.map((tabInfo, index) => {
    const activeClass = index === 0 ? "side-nav--active" : "";
    return (
      <li key={tabInfo.label + index} className={activeClass}>
        <a href={tabInfo.href}>
          <svg>
            <use xlinkHref={tabInfo.xlinkHref}></use>
          </svg>
          {tabInfo.label}
        </a>
      </li>
    );
  });

  return (
    <nav className={classes["user-view__menu"]}>
      <ul className={"side-nav"}>{menuItems}</ul>
    </nav>
  );
};

const AccountPage = ({}: AccountPageProps) => {
  const userSideMenu = getUserSideMenu();

  return (
    <div className={classes.AccountPage}>
      <div className={classes["user-view"]}>
        {userSideMenu}
        <div className="user-view__content">
          <div className="user-view__form-container">
            <h2 className="heading-secondary ma-bt-md">
              Your account settings
            </h2>
            <form className="form form-user-data">
              <div className="form__group">
                <label className="form__label" htmlFor="name">
                  Name
                </label>
                <input
                  className="form__input"
                  id="name"
                  type="text"
                  value="Lourdes Browning"
                  required
                  name="name"
                />
              </div>
              <div className="form__group ma-bt-md">
                <label className="form__label" htmlFor="email">
                  Email address
                </label>
                <input
                  className="form__input"
                  id="email"
                  type="email"
                  value="loulou@example.com"
                  required
                  name="email"
                />
              </div>
              <div className="form__group form__photo-upload">
                <img
                  className="form__user-photo"
                  src="/img/users/user-2.jpg"
                  alt="User photo"
                />
                <input
                  className="form__upload"
                  type="file"
                  accept="image/*"
                  id="photo"
                  name="photo"
                />
                <label htmlFor="photo">Choose new photo</label>
              </div>
              <div className="form__group right">
                <button className="btn btn--small btn--green">
                  Save settings
                </button>
              </div>
            </form>
          </div>
          <div className="line">&nbsp;</div>
          <div className="user-view__form-container">
            <h2 className="heading-secondary ma-bt-md">Password change</h2>
            <form className="form form-user-password">
              <div className="form__group">
                <label className="form__label" htmlFor="password-current">
                  Current password
                </label>
                <input
                  className="form__input"
                  id="password-current"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>
              <div className="form__group">
                <label className="form__label" htmlFor="password">
                  New password
                </label>
                <input
                  className="form__input"
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>
              <div className="form__group ma-bt-lg">
                <label className="form__label" htmlFor="password-confirm">
                  Confirm password
                </label>
                <input
                  className="form__input"
                  id="password-confirm"
                  type="password"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>
              <div className="form__group right">
                <button className="btn btn--small btn--green btn--save-password">
                  Save password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
