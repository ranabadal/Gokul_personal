import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import heart from "../../components/hall_details/assets/red heart.svg";
import star from "../../components/hall_details/assets/star.svg";

import Header from "../../components/header/header";
import AboveHeader from "../../components/above_header/above_header";
import HeroSection from "../../components/hero_section/hero_section";
import Hover from "../../components/hover/hover";
import Facilities from "../../components/facilities/facilities";
import Cards from "../../components/cards/cards";
import Footer from "../../components/footer/footer";
import CardHeader from "../../components/card_header/card_header";
import HorizontalCard from "../../components/horizontal_card/horizontal_card";
import HallDetails from "../../components/hall_details/hall_details";
import FestiveSweet from "../Products/SweetProduct/FestiveSweet"; // Sweet Product Component
import Loader from "../../components/Loader/loader3/loader3";
import axios from "axios"; // Using axios for cleaner API calls

import { useToaster } from '../../utils';
const Home = () => {
  const navigate = useNavigate();
 const setToast = useToaster();
  // Card Data (Hardcoded)
  const [cardData] = useState(
  [
    { name: "Lalmohan", img: require("../../components/cards/assets/laddu.svg") },
    { name: "Pedda", img: require("../../components/cards/assets/pedaa.svg") },
    { name: "Laddu", img: require("../../components/cards/assets/laddu.svg") },
  ]
);

  // State Management
  const [banquets, setBanquets] = useState([]);
    const [basket, setBasket] = useState([]);
  const [sweets, setSweets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Banquets from API
  useEffect(() => {
    const fetchBanquets = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/banquets");
        if (!response.ok) throw new Error("Failed to fetch banquet data.");

        const data = await response.json();
        if (data.success) {
          const updatedBanquets = data.banquets.map((banquet) => ({
            ...banquet,
            selectedImage:
              banquet.images[0]?.data
                ? `data:${banquet.images[0].contentType};base64,${banquet.images[0].data}`
                : null,
          }));
          setBanquets(updatedBanquets);
        } else {
          throw new Error("No banquet data found.");
        }
      } catch (error) {
        console.error("Error:", error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanquets();
  }, []);


  const handleAddToCart = async (productId) => {
    console.log('Product ID before sending:', typeof productId, productId); // Log the type and value
  
    try {
      const token = localStorage.getItem("jwtToken");
  
      if (!token) {
        setToast('Please log in first!', 'error');
        return;
      }
  
      // Ensure productId is a simple string and not an object
      const flatProductId = (typeof productId === 'object' && productId._id) ? productId._id : productId;
  
      const response = await fetch("http://localhost:8080/api/cart", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: flatProductId.toString(), // Ensure productId is a string
          quantity: 1
        })
      });
  
      const data = await response.json();
      if (data.success) {
        setToast('Product added to cart successfully!', 'success');
        setBasket([...basket, flatProductId]);
      } else {
        alert(`Error adding to cart: ${data.message}`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setToast('An error occurred while adding the product to the cart.', 'error');
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        setToast('Please log in first!', 'error');
        return;
      }

      await axios.delete(`http://localhost:8080/api/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setBasket(basket.filter(id => id !== productId));
      setToast('Product removed from cart successfully!', 'error');
    } catch (error) {
      console.error("Error removing from cart:", error);
      setToast('An error occurred while removing the product to the cart.', 'error');
    }
  };

  const handleAddToWishlist = async (productId) => {
    console.log("Wishlist click detected for product ID:", productId); 
    try {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        setToast('Please log in first!', 'error');
return;
}
const productIdStr = productId.toString(); // Ensure productId is a string
const response = await axios.post("http://localhost:8080/api/wishlist", { productId: productIdStr }, {
headers: {
Authorization: `Bearer ${token}`
}
});
if (response.data.success) {
setToast('Product added to wishlist successfully!', 'success');
}else{
alert(`Error adding to wishlist: ${response.data.message}`);
}
} catch (error) {
console.error("Error adding to wishlist:", error);
setToast('An error occurred while adding the product to the wishlist.', 'error');
}
};

  // Fetch Sweets from API
  useEffect(() => {
    const fetchSweets = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");
        
        // Filter only "Sweets" category and limit to 3 items
        const filteredSweets = response.data.products
          .filter((product) => product.category.toLowerCase() === "sweets")
          .slice(0, 3);
  
        setSweets(filteredSweets);
      } catch (err) {
        console.error("Error fetching sweets:", err);
      }
    };
  
    fetchSweets();
  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.above_header_container}>
      </div>
      {/* <AboveHeader/> */}
      <Header />
      <div className={styles.hero_section_container}>
        <HeroSection />
      </div>

      <div className={styles.hover_container}>
        <Hover />
      </div>

      <div className={styles.card_header_container}>
        <CardHeader />
      </div>
      
      {/* Render Sweet Products Dynamically */}
      <div className={styles.card_section_container}>
      {isLoading && <p> Loading.... </p>}
        {sweets.map((sweet) => (
          <FestiveSweet key={sweet._id} product={sweet}  addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
          addToWishlist={handleAddToWishlist}/>
        ))}
      </div>

      <div className={styles.card_header_container}>
        <CardHeader title="Hall Bookings" />
      </div>

      {/* Loader & Error Handling */}
      {isLoading && <p>Loading...</p>}
      {error && <div className={styles.error}>Error: {error}</div>}

      {/* Display Banquet Halls Dynamically */}
      <div className={styles.horizontal_cards_container}>
        {!isLoading &&
          !error &&
          banquets.slice(0, 2).map((banquet) => (
            <HallDetails
              key={banquet._id}
              name={banquet.title}
              price={`₹ ${banquet.price}/day`}
              seating={`${banquet.seatingCapacity} Seating`}
              description={banquet.description}
              rating={banquet.rating}
              icons={{ heart, star }}
              images={banquet.images.map((img) => `data:${img.contentType};base64,${img.data}`)}
              selectedImage={banquet.selectedImage}
              onImageClick={(image) =>
                setBanquets((prevBanquets) =>
                  prevBanquets.map((b) => (b._id === banquet._id ? { ...b, selectedImage: image } : b))
                )
              }
              onCheckAvailability={() =>
                navigate("/cateringForm", {
                  state: {
                    seatingCapacity: banquet.seatingCapacity,
                    hallTitle: banquet.title,
                    hallPrice: banquet.price,
                    hallImage: banquet.images[0]
                      ? `data:${banquet.images[0].contentType};base64,${banquet.images[0].data}`
                      : null,
                  },
                })
              }
            />
          ))}
      </div>

      <div className={styles.facilities_section_container}>
        <Facilities />
      </div>

      <div className={styles.footer_container}>
        <Footer />
      </div>
    </div>
  );
};

export default Home;