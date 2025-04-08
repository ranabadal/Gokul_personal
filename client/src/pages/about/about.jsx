import React from "react";
import styles from "./about.module.css";
import AboveHeader from "../../components/above_header/above_header";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Title from "./Title/title";
import Cards from "./cards/cards";
import Banner from "./banner/banner";
import Herosection from "./hero_section/herosection";
import Testimonial from "./testimonial/testimonial";
import Facilities from "../../components/facilities/facilities"
 
function About () {
    return(
        <div>
        <div><AboveHeader /></div>
        <div><Header /></div>
        <div><Herosection /></div>
        <div><Banner /></div>
        <div><Herosection /></div>
        <div><Banner /></div>
        <div className={styles.title}>
           <Title />
           </div>
        <div className={styles.center}>
            {/* <Testimonial /> */}
          
            <Cards />
            <Facilities />
        </div>
        <div><Footer /></div>
        </div>
    )
}
export default About;