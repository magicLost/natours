import React from 'react';
import classes from './Homepage.module.scss';
//import Anchor from '../../../component/UI/Anchor/Anchor';
import Header from "../Partial/Header/Header";
import Footer from '../Partial/Footer/Footer';
        
interface HomepageProps  {
    
}
const Homepage = ({}: HomepageProps) => {
    return (
        
        <div className={classes.Homepage}>

            <Header />


                <section>

                    <h3>Overview.</h3>

                </section>

            <Footer />
            
        </div>
            
    );
};
export default Homepage;
        