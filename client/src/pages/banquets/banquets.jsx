




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./banquets.module.css";
import Header from "../../components/header/header";
import AboveHeader from "../../components/above_header/above_header";
import GokulHeading from "../../components/gokul_heading/gokul_heading";
import HallDetails from "../../components/hall_details/hall_details";
import Footer from "../../components/footer/footer";
import BulkOrder from "../../components/bulk_order/bulk_order";
import DealsTimer from "../../components/deals_timer/deals_timer";
import heart from "../../components/hall_details/assets/red heart.svg";
import star from "../../components/hall_details/assets/star.svg";
import { useToaster } from "../../utils";
import Loader from "../../components/Loader/loader3/loader3"; // Assuming you have a Loader component

const Banquets = () => {
  const [banquets, setBanquets] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const setToast = useToaster();
  const navigate = useNavigate();

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

  const handleImageClick = (banquetId, image) => {
    setBanquets((prevBanquets) =>
      prevBanquets.map((banquet) =>
        banquet._id === banquetId
          ? { ...banquet, selectedImage: image }
          : banquet
      )
    );
  };

  const handleCheckAvailability = (banquet) => {
    try {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        setToast("Please log in first!", "error");
        return;
      }

      navigate("/cateringForm", {
        state: {
          seatingCapacity: banquet.seatingCapacity,
          hallTitle: banquet.title,
          hallPrice: banquet.price,
          hallImage: banquet.images[0]
            ? `data:${banquet.images[0].contentType};base64,${banquet.images[0].data}`
            : null,
        },
      });
    } catch (error) {
      console.error("Error in check availability:", error);
      alert("An error occurred while checking availability.", "error");
    }
  };

  return (
    <div className={styles.banquets}>
      <div className={styles.above_header}>
        <AboveHeader />
      </div>
      <div className={styles.header}>
        <Header />
      </div>
      <div >
        <GokulHeading />
      </div>

      {/* Show loader or error */}
      {isLoading && <Loader />}
      {error && <div className={styles.error}>Error: {error}</div>}

      {/* Render banquet details if not loading or error */}
      {!isLoading && !error && banquets.map((banquet, index) => (
        <React.Fragment key={banquet._id}>
          <div className={styles.hall_details}>
            <HallDetails
              name={banquet.title}
              price={`₹ ${banquet.price}/day`}
              seating={`${banquet.seatingCapacity} Seating`}
              description={banquet.description}
              rating={banquet.rating}
              images={banquet.images.map(
                (img) =>
                  `data:${img.contentType};base64,${img.data}`
              )}
              selectedImage={banquet.selectedImage}
              onImageClick={(image) =>
                handleImageClick(banquet._id, image)
              }
              onCheckAvailability={() =>
                handleCheckAvailability(banquet)
              }
              icons={{ heart, star }}
              showMoreImages={banquet.images.length > 5}
            />
          </div>

          {index === 0 && (
            <div className={styles.bulk_order}>
              <BulkOrder />
            </div>
          )}

          {index % 2 === 1 && (
            <div className={styles.deals_timer}>
              <DealsTimer />
            </div>
          )}
        </React.Fragment>
      ))}

      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Banquets;

