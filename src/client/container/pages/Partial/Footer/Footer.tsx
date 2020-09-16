import React from 'react';
import classes from './Footer.module.scss';
import logoGreen from '../../../../static/img/logo-green.png';
        
interface FooterProps  {
    
}
const Footer = ({}: FooterProps) => {
    return (
        
        <div className={classes.footer}>
            <div className={classes["footer__logo"]}>
                <img src={logoGreen} alt="Natours logo"/>
            </div>
            <ul className={"footer__nav"}>
                <li><a href="#">About us</a></li>
                <li><a href="#">Download apps</a></li>
                <li><a href="#">Become a guide</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
            <p className={classes["footer__copyright"]}>
                &copy; by Hren Morjovii. All rights reserved.
            </p>
        </div>
            
    );
};
export default Footer;
        