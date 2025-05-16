// import React from "react";
// import styles from "./about.module.css";
// import AboveHeader from "../../components/above_header/above_header";
// import Header from "../../components/header/header";
// import Footer from "../../components/footer/footer";
// import Title from "./Title/title";
// import Cards from "./cards/cards";
// import Banner from "./banner/banner";
// import Herosection from "./hero_section/herosection";
// import Testimonial from "./testimonial/testimonial";
// import Facilities from "../../components/facilities/facilities"

// function About () {
//     return(
//         <div>
//         <div><AboveHeader /></div>
//         <div><Header /></div>
//         <div><Herosection /></div>
//         <div><Banner /></div>
//         <div><Herosection /></div>
//         <div><Banner /></div>
//         <div className={styles.title}>
//            <Title />
//            </div>
//         <div className={styles.center}>
//             {/* <Testimonial /> */}

//             <Cards />
//             <Facilities />
//         </div>
//         <div><Footer /></div>
//         </div>
//     )
// }
// export default About;

import React from "react";
import styles from "./about.module.css";
import AboveHeader from "../../components/above_header/above_header";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import Title from "./Title/title";
import Cards from "./cards/cards";
import Banner from "./banner/banner";
import Hero_Section from "./hero_section/herosection";
import Testimonial from "./testimonial/testimonial";
import Facilities from "../../components/facilities/facilities";
import Gokul from "../about/Assets/gokul.webp";

function About() {
  return (
    <div className={styles.aboutContainer}>

      <Header />

      {/* Pass Props Dynamically */}
      <Hero_Section
        img={Gokul}
        title="About Gokul's"
        desc="🍽️ Gokul's Sweets & Fast Food – Ambala Gokul's is a popular spot in Ambala known for its mouthwatering Indian sweets and a variety of fast food options."
      />

      <Banner />

      <Hero_Section
        img={Gokul}
        title="About Geeta Gopal Sanstha"
        desc="Geeta Gopal Sanstha is a religious and charitable organization based in Ambala Cantt, Haryana. The organization is actively involved in various social welfare activities, including blood donation drives, assistance to the needy, daily satsangs (spiritual gatherings), and organizing pilgrimages. ​

During the COVID-19 lockdown in 2020, Geeta Gopal Sanstha took the initiative to distribute cooked food to homeless individuals and laborers stranded due to the lockdown, demonstrating their commitment to community service. ​
The Times of India

The organization is located at Geeta Gopal Satsang Bhawan, Anaj Mandi, Ambala Cantt - 133001, Haryana, India. For more information, you can visit their official website: 
"
      />

      <div className={styles.title}>
        <Title />
      </div>

      <div className={styles.center}>
        <Cards />
        <Facilities />
      </div>

      {/* {true && <Testimonial />}  */}

      <Footer />
    </div>
  );
}

export default About;
