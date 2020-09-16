import React from 'react';
import classes from './Header.module.scss';
import logoWhite from "./../../../../static/img/logo-white.png";
        
interface HeaderProps  {
    
}
const Header = ({}: HeaderProps) => {
    
    return (
        
        <header className={classes.Header}>
            <nav className={[classes.nav, classes["nav--tours"]].join(' ')}>
                <a className={classes['nav__el']} href="#">All tours</a>
            </nav>
            <div className="header__logo">
                <img src={logoWhite} alt="Natours logo"/>
            </div>
            <nav className={[classes.nav, classes["nav--user"]].join(' ')}>
               {/* <a className={classes['nav__el']} href="#">My bookings</a>
                 <a className={classes['nav__el']} href="#">
                    <img className={classes["nav__user-img"]} src={logoWhite} alt="User photo"/>
                    <span>Jonas</span>
                </a> */}
                <button className={classes['nav__el']}>Login</button>
                <button className={[classes['nav__el'], classes['nav__el--cta']].join(' ')}>Sign up</button>
            </nav>
        </header>
    );
};
export default Header;
        