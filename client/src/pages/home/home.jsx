import React, { useState } from "react";

import styles from "./home.module.css";

import Header from "../../components/header/header";

import AboveHeader from "../../components/above_header/above_header";

import HeroSection from "../../components/hero_section/hero_section";

import Hover from "../../components/hover/hover";

import Facilities from "../../components/facilities/facilities";

import Cards from "../../components/cards/cards";

import Footer from "../../components/footer/footer";

import laddu from "../../components/cards/assets/laddu.svg";

import pedda from "../../components/cards/assets/pedaa.svg";

import CardHeader from "../../components/card_header/card_header";

import HorizontalCard from "../../components/horizontal_card/horizontal_card";

import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    const [cardData, setCardData] = useState(
        [
        {
            name: 'Lalmohan',
            img: laddu
        }, 
        {
            name: 'pedda',
            img: pedda
        }, 
        {
            name: 'laddu',
            img: laddu
        }
    ]

);

    return (

        <div className={styles.home}>

            <div className={styles.above_header_container}><AboveHeader /></div>

            <Header />

            <div className={styles.hero_section_container}><HeroSection /></div>

            <div className={styles.hover_container}><Hover /></div>

            <div className={styles.card_header_container}><CardHeader /></div>

            <div className={styles.card_section_container}>

                {Array.isArray(cardData) && cardData.map((item, index) => {

return (

    <div

    key={index}

    onClick={() => navigate("/products")}

    style={{ cursor: "pointer" }}>

    <Cards data={item} />

    </div>

)

})

}

            </div>

            <div className={styles.card_header_container}><CardHeader title="Hall Bookings" /></div>

            <div className={styles.horizontal_cards_container}><HorizontalCard /><HorizontalCard /></div>

            <div className={styles.facilities_section_container}><Facilities /></div>

            <div className={styles.footer_container}><Footer /></div>

        </div>

);

};

export default Home;