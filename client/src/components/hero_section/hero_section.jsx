// import React, { useState, useEffect } from "react";
// import styles from "./hero_section.module.css";
// import box from "./assets/images/box.svg";

// const CountdownTimer = () => {
//     const [time, setTime] = useState({ hours: 12, minutes: 53, seconds: 21 });

//     useEffect(() => {
//         const timer = setInterval(() => {
//             setTime((prev) => {
//                 let { hours, minutes, seconds } = prev;
//                 if (seconds > 0) seconds--;
//                 else {
//                     if (minutes > 0) {
//                         minutes--;
//                         seconds = 59;
//                     } else if (hours > 0) {
//                         hours--;
//                         minutes = 59;
//                         seconds = 59;
//                     }
//                 }
//                 return { hours, minutes, seconds };
//             });
//         }, 1000);

//         return () => clearInterval(timer);
//     }, []);

//     return (
//         <div className={styles.hero_section_left_bottom}>
//             <span className={styles.hero_section_left_bottom_box}>{String(time.hours).padStart(2, "0")}</span>:
//             <span className={styles.hero_section_left_bottom_box}>{String(time.minutes).padStart(2, "0")}</span>:
//             <span className={styles.hero_section_left_bottom_box}>{String(time.seconds).padStart(2, "0")}</span>
//         </div>
//     );
// };

// const HeroSection = () => {
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const slides = [
//         {
//             title: "Handmade Happiness in Every Bite!",
//             description: "Elevate every occasion with Gokul, where we offer premium gifts that illuminate life’s special moments.",
//             image: box,
//             timer: <CountdownTimer />
//         },
//         {
//             title: "Celebrate with Gokul!",
//             description: "Discover the joy of gifting with our exclusive Diwali offers.",
//             image: box,
//             timer: <CountdownTimer />
//         },
//         {
//             title: "Special Moments, Special Gifts",
//             description: "Make every moment memorable with our handcrafted gifts.",
//             image: box,
//             timer: <CountdownTimer />
//         },
//     ];

//     const nextSlide = () => {
//         setCurrentSlide((prev) => (prev + 1) % slides.length);
//     };

//     const prevSlide = () => {
//         setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//     };

//     useEffect(() => {
//         const slideInterval = setTimeout(nextSlide, 2000);
//         return () => clearTimeout(slideInterval);
//     }, [currentSlide]);

//     return (
//         <div>
//             <div className={styles.hero_section_container}>
//                 <div className={styles.hero_section}>
//                     <button className={styles.hero_section_bttn_left} onClick={prevSlide}><span>&larr;</span></button>
//                     <div className={styles.hero_section_left}>
//                         <div className={styles.hero_section_left_div_1}>
//                             <div className={styles.hero_section_left_top}>Diwali Offer Ends in</div>
//                             {slides[currentSlide].timer}
//                         </div>
//                         <div className={styles.hero_section_left_bottom}>
//                             <img src={slides[currentSlide].image} className={styles.image} alt="Offer Box" />
//                         </div>
//                     </div>
//                     <div className={styles.hero_section_right_container}>
//                         <h2 className={styles.hero_section_right_title}>{slides[currentSlide].title}</h2>
//                         <p className={styles.hero_section_right_description}>
//                             {slides[currentSlide].description}
//                         </p>
//                     </div>
//                     <button className={styles.hero_section_bttn_right} onClick={nextSlide}><span>&rarr;</span></button>
//                 </div>
//             </div>
            
//             <div className={styles.hero_section_right_buttons}>
//                 <button className={styles.order_button}>Order Now</button>
//                 <button className={styles.explore_button}>Explore More</button>
//             </div>

//             <div className={styles.hero_section_bottom_dots}>
//                 {slides.map((_, index) => (
//                     <div
//                         key={index}
//                         className={`${styles.hero_section_bottom_dot} ${currentSlide === index ? styles.active : ""}`}
//                         onClick={() => setCurrentSlide(index)}
//                     ></div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default HeroSection;
// export { CountdownTimer };



import React, { useState, useEffect } from "react";
import styles from "./hero_section.module.css";
import box from "./assets/images/box.svg";
import { useNavigate } from "react-router-dom";

const CountdownTimer = () => {
    const [time, setTime] = useState({ hours: 12, minutes: 53, seconds: 21 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prev) => {
                let { hours, minutes, seconds } = prev;
                if (seconds > 0) seconds--;
                else {
                    if (minutes > 0) {
                        minutes--;
                        seconds = 59;
                    } else if (hours > 0) {
                        hours--;
                        minutes = 59;
                        seconds = 59;
                    }
                }
                return { hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className={styles.hero_section_left_bottom}>
            <span className={styles.hero_section_left_bottom_box}>{String(time.hours).padStart(2, "0")}</span>:
            <span className={styles.hero_section_left_bottom_box}>{String(time.minutes).padStart(2, "0")}</span>:
            <span className={styles.hero_section_left_bottom_box}>{String(time.seconds).padStart(2, "0")}</span>
        </div>
    );
};

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        {
            title: "Handmade Happiness in Every Bite!",
            description: "Elevate every occasion with Evara, where we offer premium gifts that illuminate life’s special moments.",
            image: box,
            timer: <CountdownTimer />
        },
        {
            title: "Celebrate with Evara!",
            description: "Discover the joy of gifting with our exclusive Diwali offers.",
            image: box,
            timer: <CountdownTimer />
        },
        {
            title: "Special Moments, Special Gifts",
            description: "Make every moment memorable with our handcrafted gifts.",
            image: box,
            timer: <CountdownTimer />
        },
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        const slideInterval = setTimeout(nextSlide, 2000);
        return () => clearTimeout(slideInterval);
    }, [currentSlide]);


    const navigate = useNavigate();
    

    return (
        <div>
            <div className={styles.hero_section_container}>
                <div className={styles.hero_section}>
                    <button className={styles.hero_section_bttn_left} onClick={prevSlide}><span>&larr;</span></button>
                    <div className={styles.hero_section_left}>
                        <div className={styles.hero_section_left_div_1}>
                            <div className={styles.hero_section_left_top}>Diwali Offer Ends in</div>
                            {slides[currentSlide].timer}
                        </div>
                        <div className={styles.hero_section_left_bottom}>
                            <img src={slides[currentSlide].image} className={styles.image} alt="Offer Box" />
                        </div>
                    </div>
                    <div className={styles.hero_section_right_container}>
                        <h2 className={styles.hero_section_right_title}>{slides[currentSlide].title}</h2>
                        <p className={styles.hero_section_right_description}>
                            {slides[currentSlide].description}
                        </p>
                    </div>
                    <button className={styles.hero_section_bttn_right} onClick={nextSlide}><span>&rarr;</span></button>
                </div>
            </div>
            
            <div className={styles.hero_section_right_buttons}>
                <button className={styles.order_button}  onClick={() => navigate("/products")}>Order Now</button>
                <button className={styles.explore_button} onClick={() => navigate("/about")}  >Explore More</button>
            </div>

            <div className={styles.hero_section_bottom_dots}>
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`${styles.hero_section_bottom_dot} ${currentSlide === index ? styles.active : ""}`}
                        onClick={() => setCurrentSlide(index)}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default HeroSection;
export { CountdownTimer };
