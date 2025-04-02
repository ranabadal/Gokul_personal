// import React, { useState } from "react";
// import styles from "./giftBoxes.module.css";
// import Header from "../../components/header/header";
// import AboveHeader from "../../components/above_header/above_header";
// import GokulHeading from "../../components/gokul_heading/gokul_heading";
// import GiftBoxAndBulkTemplate from "../../components/GiftBoxAndBulkTemplate/giftBoxAndBulkTemplate"
// import Footer from "../../components/footer/footer";
// import BulkOrder from "../../components/bulk_order/bulk_order";
// import DealsTimer from "../../components/deals_timer/deals_timer";
// import space from "../../components/hall_details/assets/space.svg";
// import heart from "../../components/hall_details/assets/red heart.svg";
// import star from "../../components/hall_details/assets/star.svg";
// import card1 from "../../components/hall_details/assets/card1.svg";
// import card2_3 from "../../components/hall_details/assets/card2_3.svg";
// import callender_logo from "../../components/hall_details/assets/callender logo.svg";
// import clock_logo from "../../components/hall_details/assets/clock logo.svg";
// import { useNavigate } from "react-router-dom";


// const GiftBoxes = () => {
//     const [hallDetailsData, setHallDetailsData] = useState({
//         name: "Banquet Hall 3",
//         price: "₹ 14999/day",
  

//         description: "Dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown",
//         rating: "5.0",
//         images: [space, card2_3, card2_3, card2_3, card2_3, card2_3, card2_3, card2_3],
//         icons: {
//             heart,
//             star,
//             callender_logo,
//             clock_logo,
//             space
//         },
//         selectedImage: card2_3,
//     });

//     const navigate = useNavigate();

//     const handleDateChange = (field, value) => {
//         setHallDetailsData(prevState => ({
//             ...prevState,
//             [field]: value
//         }));
//     };

//     const handleImageClick = (image) => {
//         setHallDetailsData(prevState => ({
//             ...prevState,
//             selectedImage: image
//         }));
//     };

//     const handleClick =() =>{
         
//         console.log("Button clicked");
//         navigate("/giftboxOrder")
        
//     };

//     return (
//         <div className={styles.banquets}>
//             <div className={styles.above_header}><AboveHeader /></div>
//             <div className={styles.header}><Header /></div>
//             <div className={styles.gokul_heading}><GokulHeading /></div>
//             <div className={styles.hall_details}><GiftBoxAndBulkTemplate {...hallDetailsData} onDateChange={handleDateChange} onImageClick={handleImageClick} showMoreImages={true}  onClick={handleClick}/></div>
//             <div className={styles.bulk_order}><BulkOrder /></div>
//             <div className={styles.hall_details}><GiftBoxAndBulkTemplate {...hallDetailsData} onDateChange={handleDateChange} onImageClick={handleImageClick} showMoreImages={true}  onClick={handleClick} /></div>
//             <div className={styles.deals_timer}><DealsTimer /></div>
//             <div className={styles.hall_details}><GiftBoxAndBulkTemplate {...hallDetailsData} onDateChange={handleDateChange} onImageClick={handleImageClick} showMoreImages={true}  onClick={handleClick}/></div>
//             <div className={styles.footer}><Footer /></div>
//         </div>
//     );
// };

// export default GiftBoxes;


// import React, { useState, useEffect } from "react";
// import styles from "./giftBoxes.module.css";
// import Header from "../../components/header/header";
// import AboveHeader from "../../components/above_header/above_header";
// import GokulHeading from "../../components/gokul_heading/gokul_heading";
// import GiftBoxAndBulkTemplate from "../../components/GiftBoxAndBulkTemplate/giftBoxAndBulkTemplate";
// import Footer from "../../components/footer/footer";
// import BulkOrder from "../../components/bulk_order/bulk_order";
// import DealsTimer from "../../components/deals_timer/deals_timer";
// import heart from "../../components/hall_details/assets/red heart.svg";
// import star from "../../components/hall_details/assets/star.svg";
// import { useToaster } from "../../utils";
// import FilterChip from "../../components/GiftBoxAndBulkPageFilter/filter";
// import { useNavigate } from "react-router-dom";

// const GiftBoxes = () => {
//     const [giftBoxes, setGiftBoxes] = useState([]);
//     const [error, setError] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);

//     const setToast = useToaster();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchGiftBoxes = async () => {
//             try {
//                 const response = await fetch("http://localhost:8080/api/giftBoxes");
//                 if (!response.ok) throw new Error("Failed to fetch gift box data.");

//                 const data = await response.json();
//                 if (data.success) {
//                     const updatedGiftBoxes = data.giftBoxes.map((box) => ({
//                         ...box,
//                         selectedImage: box.images[0]?.data
//                             ? `data:${box.images[0].contentType};base64,${box.images[0].data}`
//                             : null,
//                     }));
//                     setGiftBoxes(updatedGiftBoxes);
//                 } else {
//                     throw new Error("No gift box data found.");
//                 }
//             } catch (error) {
//                 console.error("Error:", error.message);
//                 setError(error.message);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchGiftBoxes();
//     }, []);

//     const handleAddToWishlist = async (giftBoxId) => {
//         try {
//             const token = localStorage.getItem("jwtToken");

//             if (!token) {
//                 setToast("Please log in first!", "error");
//                 return;
//             }

//             const response = await fetch("http://localhost:8080/api/wishlist", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({ giftBoxId }),
//             });

//             const data = await response.json();
//             if (data.success) {
//                 setToast("Gift box added to wishlist successfully!", "success");
//             } else {
//                 alert(`Error adding to wishlist: ${data.message}`);
//             }
//         } catch (error) {
//             console.error("Error adding to wishlist:", error);
//             setToast("An error occurred while adding the gift box to the wishlist.", "error");
//         }
//     };

//     const handleImageClick = (giftBoxId, image) => {
//         setGiftBoxes((prevGiftBoxes) =>
//             prevGiftBoxes.map((box) =>
//                 box._id === giftBoxId ? { ...box, selectedImage: image } : box
//             )
//         );
//     };

//     const handleClick = () => {
//         console.log("Button clicked");
//         navigate("/giftboxOrder");
//     };

//     if (isLoading) return <div className={styles.loading}>Loading gift box data...</div>;
//     if (error) return <div className={styles.error}>Error: {error}</div>;

//     return (
//         <div className={styles.giftBoxes}>
//             <div className={styles.above_header}>
//                 <AboveHeader />
//             </div>
//             <div className={styles.header}>
//                 <Header />
//             </div>
//             <div className={styles.gokul_heading}>
//                 <div>Gift Boxes</div>
//             </div>

//             {giftBoxes.map((box, index) => (
//                 <React.Fragment key={box._id}>
//                     <div className={styles.hall_details}>
//                         <GiftBoxAndBulkTemplate
//                             name={box.title}
//                             price={`₹ ${box.price}`}
//                             description={box.description}
//                             selectedImage={box.selectedImage}
//                             images={box.images.map(
//                                 (img) => `data:${img.contentType};base64,${img.data}`
//                             )}
//                             onImageClick={(image) => handleImageClick(box._id, image)}
//                             onAddToWishlist={() => handleAddToWishlist(box._id)}
//                             showMoreImages={box.images.length > 5}
//                             icons={{ heart, star }}
//                             onClick={handleClick}
//                         />
//                     </div>

//                     {/* Insert BulkOrder after the first item */}
//                     {index === 0 && (
//                         <div className={styles.bulk_order}>
//                             <BulkOrder />
//                         </div>
//                     )}

//                     {/* Insert DealsTimer after every second item */}
//                     {index % 2 === 1 && (
//                         <div className={styles.deals_timer}>
//                             <DealsTimer />
//                         </div>
//                     )}
//                 </React.Fragment>
//             ))}

//             <div className={styles.footer}>
//                 <Footer />
//             </div>
//         </div>
//     );
// };

// export default GiftBoxes;



// import React, { useState, useEffect } from "react";
// import styles from "./giftBoxes.module.css";
// import Header from "../../components/header/header";
// import AboveHeader from "../../components/above_header/above_header";
// import GokulHeading from "../../components/gokul_heading/gokul_heading";
// import GiftBoxAndBulkTemplate from "../../components/GiftBoxAndBulkTemplate/giftBoxAndBulkTemplate";
// import Footer from "../../components/footer/footer";
// import BulkOrder from "../../components/bulk_order/bulk_order";
// import DealsTimer from "../../components/deals_timer/deals_timer";
// import heart from "../../components/hall_details/assets/red heart.svg";
// import star from "../../components/hall_details/assets/star.svg";
// import { useToaster } from "../../utils";
// import FilterChip from "../../components/GiftBoxAndBulkPageFilter/filter";
// import { useNavigate } from "react-router-dom";
// import Loader from '../../components/Loader/loader1/sweetLoader';


// const GiftBoxes = () => {
//     const [giftBoxes, setGiftBoxes] = useState([]);
//     const [error, setError] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [currentFilter, setCurrentFilter] = useState("All");

//     const setToast = useToaster();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchGiftBoxes = async () => {
//             try {
//                 const response = await fetch("http://localhost:8080/api/giftBoxes");
//                 if (!response.ok) throw new Error("Failed to fetch gift box data.");

//                 const data = await response.json();
//                 if (data.success) {
//                     const updatedGiftBoxes = data.giftBoxes.map((box) => ({
//                         ...box,
//                         selectedImage: box.images[0]?.data
//                             ? `data:${box.images[0].contentType};base64,${box.images[0].data}`
//                             : null,
//                     }));
//                     setGiftBoxes(updatedGiftBoxes);
//                 } else {
//                     throw new Error("No gift box data found.");
//                 }
//             } catch (error) {
//                 console.error("Error:", error.message);
//                 setError(error.message);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchGiftBoxes();
//     }, []);

//     const handleAddToWishlist = async (giftBoxId) => {
//         try {
//             const token = localStorage.getItem("jwtToken");

//             if (!token) {
//                 setToast("Please log in first!", "error");
//                 return;
//             }

//             const response = await fetch("http://localhost:8080/api/wishlist", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify({ giftBoxId }),
//             });

//             const data = await response.json();
//             if (data.success) {
//                 setToast("Gift box added to wishlist successfully!", "success");
//             } else {
//                 alert(`Error adding to wishlist: ${data.message}`);
//             }
//         } catch (error) {
//             console.error("Error adding to wishlist:", error);
//             setToast("An error occurred while adding the gift box to the wishlist.", "error");
//         }
//     };

//     const handleImageClick = (giftBoxId, image) => {
//         setGiftBoxes((prevGiftBoxes) =>
//             prevGiftBoxes.map((box) =>
//                 box._id === giftBoxId ? { ...box, selectedImage: image } : box
//             )
//         );
//     };

//     const handleFilterClick = (filterValue) => {
//         setCurrentFilter(filterValue);
//     };

//     const normalizeFilterLabel = (label) => {
//         switch (label) {
//             case "Small (500 gm)":
//                 return "500 gm";
//             case "Medium (1 kg)":
//                 return "1 kg";
//             case "Large (2 kg)":
//                 return "2 kg";
//             default:
//                 return label;
//         }
//     };

//     const filteredGiftBoxes =
//         currentFilter === "All"
//             ? giftBoxes
//             : giftBoxes.filter(
//                   (box) => box.size === normalizeFilterLabel(currentFilter)
//               );

//               const handleClick = (box) => {
//                 try {
//                     const token = localStorage.getItem("jwtToken");
              
//                     if (!token) {
//                         setToast('Please log in first!', 'error');
//                         return;
//                     }
              
//                     const selectedOrderDetails = {
//                         name: box.title,
//                         size: box.size,
//                         image: box.images && box.images.length > 0
//                             ? `data:${box.images[0].contentType};base64,${box.images[0].data}`
//                             : null
//                     };
              
//                     console.log("Selected Order Details:", selectedOrderDetails);
              
//                     navigate("/giftboxCart", { state: selectedOrderDetails });
//                 } catch (error) {
//                     console.error("Error in handleClick:", error);
//                     setToast('An unexpected error occurred!', 'error');
//                 }
//               };

//     if (isLoading) return <Loader />;
//     if (error) return <div className={styles.error}>Error: {error}</div>;

//     return (
//         <div className={styles.giftBoxes}>
//             <div className={styles.above_header}>
//                 <AboveHeader />
//             </div>
//             <div className={styles.header}>
//                 <Header />
//             </div>
//             <div className={styles.gokul_heading}>
//                 <div>Gift Boxes</div>
//             </div>

//             {/* Filter Section */}
//             <div className={styles.filtersection}>
//                 <div className={styles.filters}>
//                     <FilterChip
//                         label="All"
//                         isActive={currentFilter === "All"}
//                         onClick={() => handleFilterClick("All")}
//                     />
//                     <FilterChip
//                         label="Small (500 gm)"
//                         isActive={currentFilter === "Small (500 gm)"}
//                         onClick={() => handleFilterClick("Small (500 gm)")}
//                     />
//                     <FilterChip
//                         label="Medium (1 kg)"
//                         isActive={currentFilter === "Medium (1 kg)"}
//                         onClick={() => handleFilterClick("Medium (1 kg)")}
//                     />
//                     <FilterChip
//                         label="Large (2 kg)"
//                         isActive={currentFilter === "Large (2 kg)"}
//                         onClick={() => handleFilterClick("Large (2 kg)")}
//                     />
//                 </div>
//             </div>

//             {/* Display filtered gift boxes */}
//             {filteredGiftBoxes.map((box, index) => (
//                 <React.Fragment key={box._id}>
//                     <div className={styles.hall_details}>
//                         <GiftBoxAndBulkTemplate
//                             name={box.title}
//                             price={`₹ ${box.price}`}
//                             description={box.description}
//                             selectedImage={box.selectedImage}
//                             images={box.images.map(
//                                 (img) =>
//                                     `data:${img.contentType};base64,${img.data}`
//                             )}
//                             onImageClick={(image) =>
//                                 handleImageClick(box._id, image)
//                             }
//                             onAddToWishlist={() => handleAddToWishlist(box._id)}
//                             showMoreImages={box.images.length > 5}
//                             icons={{ heart, star }}
//                             onClick={() => handleClick(box)}
//                         />
//                     </div>

//                     {/* Insert BulkOrder after the first item */}
//                     {index === 0 && (
//                         <div className={styles.bulk_order}>
//                             <BulkOrder />
//                         </div>
//                     )}

//                     {/* Insert DealsTimer after every second item */}
//                     {index % 2 === 1 && (
//                         <div className={styles.deals_timer}>
//                             <DealsTimer />
//                         </div>
//                     )}
//                 </React.Fragment>
//             ))}

//             <div className={styles.footer}>
//                 <Footer />
//             </div>
//         </div>
//     );
// };

// export default GiftBoxes;


import React, { useState, useEffect } from "react";
import styles from "./giftBoxes.module.css";
import Header from "../../components/header/header";
import AboveHeader from "../../components/above_header/above_header";
import GokulHeading from "../../components/gokul_heading/gokul_heading";
import GiftBoxAndBulkTemplate from "../../components/GiftBoxAndBulkTemplate/giftBoxAndBulkTemplate";
import Footer from "../../components/footer/footer";
import FilterChip from "../../components/GiftBoxAndBulkPageFilter/filter";
import Loader from '../../components/Loader/loader1/sweetLoader';

const GiftBoxes = () => {
    const [giftBoxes, setGiftBoxes] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentFilter, setCurrentFilter] = useState("All");

    useEffect(() => {
        const fetchGiftBoxes = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/giftBoxes");
                if (!response.ok) throw new Error("Failed to fetch gift box data.");

                const data = await response.json();
                if (data.success) {
                    const updatedGiftBoxes = data.giftBoxes.map((box) => ({
                        ...box,
                        selectedImage: box.images[0]?.data
                            ? `data:${box.images[0].contentType};base64,${box.images[0].data}`
                            : null,
                    }));
                    setGiftBoxes(updatedGiftBoxes);
                } else {
                    throw new Error("No gift box data found.");
                }
            } catch (error) {
                console.error("Error:", error.message);
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchGiftBoxes();
    }, []);

    const handleFilterClick = (filterValue) => {
        setCurrentFilter(filterValue);
    };

    const filteredGiftBoxes =
        currentFilter === "All"
            ? giftBoxes
            : giftBoxes.filter((box) => box.size === currentFilter);

    return (
        <div className={styles.giftBoxes}>
            <div className={styles.above_header}>
                <AboveHeader />
            </div>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.gokul_heading}>
                <div>Gift Boxes</div>
            </div>

            {/* Show loader or error while keeping the above layout */}
            {isLoading && <Loader />}
            {error && <div className={styles.error}>Error: {error}</div>}

            {/* Render gift boxes when not loading */}
            {!isLoading && !error && (
                <>
                    <div className={styles.filtersection}>
                    <div className={styles.filters}>
                    <FilterChip
                        label="All"
                        isActive={currentFilter === "All"}
                        onClick={() => handleFilterClick("All")}
                    />
                    <FilterChip
                        label="Small (500 gm)"
                        isActive={currentFilter === "Small (500 gm)"}
                        onClick={() => handleFilterClick("Small (500 gm)")}
                    />
                    <FilterChip
                        label="Medium (1 kg)"
                        isActive={currentFilter === "Medium (1 kg)"}
                        onClick={() => handleFilterClick("Medium (1 kg)")}
                    />
                    <FilterChip
                        label="Large (2 kg)"
                        isActive={currentFilter === "Large (2 kg)"}
                        onClick={() => handleFilterClick("Large (2 kg)")}
                    />
                </div>
                    </div>

                    {filteredGiftBoxes.map((box) => (
                        <div key={box._id} className={styles.hall_details}>
                            <GiftBoxAndBulkTemplate
                                name={box.title}
                                price={`₹ ${box.price}`}
                                description={box.description}
                                selectedImage={box.selectedImage}
                                images={box.images.map(
                                    (img) =>
                                        `data:${img.contentType};base64,${img.data}`
                                )}
                            />
                        </div>
                    ))}
                </>
            )}

            <div className={styles.footer}>
                <Footer />
            </div>
        </div>
    );
};

export default GiftBoxes;