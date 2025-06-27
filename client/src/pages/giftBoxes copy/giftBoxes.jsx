
// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
// import Header from "../../components/header/header";
// import AboveHeader from "../../components/above_header/above_header";
// import Footer from "../../components/footer/footer";
// import Loader from "../../components/Loader/loader1/sweetLoader";
// import GiftBoxAndBulkTemplate from "../../components/GiftBoxAndBulkTemplate/giftBoxAndBulkTemplate";
// import GiftBoxCartRight from "./giftBoxCart/giftBoxCartRight/giftBoxCartRight";
// import styles from "./giftBoxes.module.css";
// import { BASE_URL } from "../../Const/Const";
// const MainGiftBoxes = () => {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [giftBoxes, setGiftBoxes] = useState([]);
//   const [handbags, setHandbags] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Cart state: Each item: { id, type, details, quantity, matchingHandbags }
//   const [cartItems, setCartItems] = useState([]);
//   const [basketTotal, setBasketTotal] = useState(0);
//   const [additionalCharges, setAdditionalCharges] = useState(0);
//   const [deliveryCharges, setDeliveryCharges] = useState(0);
//   const [discount, setDiscount] = useState(0);
//   const [promoCode, setPromoCode] = useState("");

//   // For editing – store an item for editing (do not remove it from cart)
//   const [editingItem, setEditingItem] = useState(null);

//   const subcategoriesRef = useRef(null);

//   // New state: visible count for gift boxes and handbags (load 5 at a time)
//   const [visibleGiftBoxesCount, setVisibleGiftBoxesCount] = useState(5);
//   const [visibleHandbagsCount, setVisibleHandbagsCount] = useState(5);

//   useEffect(() => {
//     fetchCategories();
//     fetchProducts();
//   }, []);

//   // Reset visible counts when category changes so that a new category always starts with 5 items.
//   useEffect(() => {
//     setVisibleGiftBoxesCount(5);
//     setVisibleHandbagsCount(5);
//   }, [selectedCategory]);

//   useEffect(() => {
//     const total = cartItems.reduce((sum, item) => {
//       return sum + Number(item.details.price) * Number(item.quantity);
//     }, 0);
//     setBasketTotal(total);
//   }, [cartItems]);

//   const fetchCategories = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${BASE_URL}/api/giftboxpage/categories`);
//       setCategories(res.data);
//       if (res.data.length > 0) setSelectedCategory(res.data[0]._id);
//     } catch (error) {
//       console.error("Error fetching categories:", error.response?.data || error.message);
//     }
//     setLoading(false);
//   };

//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const [giftBoxRes, handbagRes] = await Promise.all([
//         axios.get(`${BASE_URL}/api/giftboxpage/giftBoxes`),
//         axios.get(`${BASE_URL}/api/giftboxpage/generalHandbags`),
//       ]);
//       setGiftBoxes(giftBoxRes.data);
//       setHandbags(handbagRes.data);
//     } catch (error) {
//       console.error("Error fetching products:", error.response?.data || error.message);
//     }
//     setLoading(false);
//   };

//   const scrollSubcategories = (direction, ref) => {
//     if (ref.current) {
//       const scrollAmount = 300;
//       if (direction === "left") {
//         ref.current.scrollLeft -= scrollAmount;
//       } else {
//         ref.current.scrollLeft += scrollAmount;
//       }
//     }
//   };

//   const filteredGiftBoxes = giftBoxes.filter((gb) => gb.category?._id === selectedCategory);
//   const filteredHandbags = handbags.filter((hb) => hb.category?._id === selectedCategory);

//   // Compute external state for a product:
//   const getExternalState = (id, type) => {
//     const item = cartItems.find((itm) => itm.id === id && itm.type === type);
//     return {
//       externalSelected: !!item,
//       externalQuantity: item ? item.quantity : undefined,
//       externalMatchingHandbags: (item && item.matchingHandbags) || [],
//     };
//   };

//   // Callback when a product toggles selection.
//   const handleSelectionChange = (id, type, data, selected, selectionData) => {
//     setCartItems((prev) => {
//       const existsIndex = prev.findIndex((item) => item.id === id && item.type === type);
//       if (selected) {
//         if (existsIndex !== -1) {
//           const newCart = [...prev];
//           newCart[existsIndex] = { id, type, details: data, ...selectionData };
//           return newCart;
//         }
//         return [...prev, { id, type, details: data, ...selectionData }];
//       } else {
//         return prev.filter((item) => !(item.id === id && item.type === type));
//       }
//     });
//   };

//   // Callback for live updates.
//   const handleUpdate = (id, type, selectionData) => {
//     setCartItems((prev) =>
//       prev.map((item) => {
//         if (item.id === id && item.type === type) return { ...item, ...selectionData };
//         return item;
//       })
//     );
//   };

//   // Edit callback
//   const handleEditBox = (id, type) => {
//     const item = cartItems.find((itm) => itm.id === id && itm.type === type);
//     if (item) {
//       setEditingItem(item);
//       console.log("Editing item:", item);
//     }
//   };

//   const handleDeleteBox = (id, type) => {
//     setCartItems((prev) => prev.filter((item) => !(item.id === id && item.type === type)));
//   };

//   const handleCheckout = () => {
//     console.log("Checkout with:", cartItems);
//   };

//   // Added loading feature without changing any other section of your code
//   if (loading) {
//     return (
//       <>
//         <Header />
//         <Loader />
//         <Footer />
//       </>
//     );
//   }

//   return (
//     <div className={styles.mainContainer}>
//       <Header />
//             <div className={styles.heading0}>Gift Boxes</div>


//       {/* <div className={styles.heading}>Gift Boxes</div> */}
//       <div className={styles.contentContainer}>
//         <div className={styles.leftSection}>
//           {/* Categories Section */}
//           <div>
//             <div className={styles.heading}>Categories</div>
//             <div className={styles.subcategoriesWrapper}>
//               <FiChevronLeft className={styles.arrow} onClick={() => scrollSubcategories("left", subcategoriesRef)} />
//               <div className={styles.subcategories} ref={subcategoriesRef}>
//                 {categories.map((cat) => (
//                   <div
//                     key={cat._id}
//                     className={`${styles.subcategoryCard} ${selectedCategory === cat._id ? styles.active : ""}`}
//                     onClick={() => setSelectedCategory(cat._id)}
//                   >
//                     <img src={cat.image} alt={cat.name} className={styles.subcategoryImage} />
//                     <p className={styles.subcategoryName}>{cat.name}</p>
//                   </div>
//                 ))}
//               </div>
//               <FiChevronRight className={styles.arrow} onClick={() => scrollSubcategories("right", subcategoriesRef)} />
//             </div>
//           </div>
//           {/* Product Listing */}
//           <div>
//             <div className={styles.heading}>Gift Boxes</div>
//             <div className={styles.productsList}>
//               {filteredGiftBoxes.length > 0
//                 ? filteredGiftBoxes.slice(0, visibleGiftBoxesCount).map((gb) => {
//                     const extState = getExternalState(gb._id, "giftBox");
//                     return (
//                       <GiftBoxAndBulkTemplate
//                         key={gb._id}
//                         id={gb._id}
//                         name={gb.name}
//                         description={gb.description}
//                         price={gb.price}
//                         minOrderQuantity={gb.minOrderQuantity}
//                         image={gb.image}
//                         type="giftBox"
//                         matchingHandbags={gb.matchingHandbags || []}
//                         onSelectionChange={handleSelectionChange}
//                         onUpdate={handleUpdate}
//                         data={gb}
//                         externalSelected={extState.externalSelected}
//                         externalQuantity={extState.externalQuantity}
//                         externalMatchingHandbags={extState.externalMatchingHandbags}
//                       />
//                     );
//                   })
//                 : <p>No gift boxes available in this category.</p>}
//             </div>
//             {filteredGiftBoxes.length > visibleGiftBoxesCount && (
//               <button  className={styles.loadMore} onClick={() => setVisibleGiftBoxesCount(visibleGiftBoxesCount + 5)}>Load More</button>
//             )}

//             <div className={styles.heading1}>General Handbags</div>
//             <div className={styles.productsList}>
//               {filteredHandbags.length > 0
//                 ? filteredHandbags.slice(0, visibleHandbagsCount).map((hb) => {
//                     const extState = getExternalState(hb._id, "handbag");
//                     return (
//                       <GiftBoxAndBulkTemplate
//                         key={hb._id}
//                         id={hb._id}
//                         name={hb.name}
//                         price={hb.price}
//                         minOrderQuantity={hb.minOrderQuantity}
//                         image={hb.image}
//                         type="handbag"
//                         matchingHandbags={[]} // No matching for handbags
//                         onSelectionChange={handleSelectionChange}
//                         onUpdate={handleUpdate}
//                         data={hb}
//                         externalSelected={extState.externalSelected}
//                         externalQuantity={extState.externalQuantity}
//                         externalMatchingHandbags={extState.externalMatchingHandbags}
//                       />
//                     );
//                   })
//                 : <p>No handbags available in this category.</p>}
//             </div>
//             {filteredHandbags.length > visibleHandbagsCount && (
//               <button onClick={() => setVisibleHandbagsCount(visibleHandbagsCount + 5)}>Load More</button>
//             )}
//           </div>
//         </div>

//         <div className={styles.rightSection}>
//           <GiftBoxCartRight
//             cartItems={cartItems}
//             basketTotal={basketTotal}
//             additionalCharges={additionalCharges}
//             deliveryCharges={deliveryCharges}
//             discount={discount}
//             promoCode={promoCode}
//             handleCheckout={handleCheckout}
//             handleEditBox={handleEditBox}
//             handleDeleteBox={handleDeleteBox}
//           />
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default MainGiftBoxes;







import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Header from "../../components/header/header";
import AboveHeader from "../../components/above_header/above_header";
import Footer from "../../components/footer/footer";
import Loader from "../../components/Loader/loader1/sweetLoader";
import GiftBoxAndBulkTemplate from "../../components/GiftBoxAndBulkTemplate/giftBoxAndBulkTemplate";
import GiftBoxCartRight from "./giftBoxCart/giftBoxCartRight/giftBoxCartRight";
import styles from "./giftBoxes.module.css";
import { BASE_URL } from "../../Const/Const";

const MainGiftBoxes = () => {
  // State for Categories & Products
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [giftBoxes, setGiftBoxes] = useState([]);
  const [handbags, setHandbags] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cart state: Each item: { id, type, details, quantity, matchingHandbags, selectedSweets }
  const [cartItems, setCartItems] = useState([]);
  // Basket total is computed (including giftBox sweets where available)
  const [basketTotal, setBasketTotal] = useState(0);
  const [additionalCharges, setAdditionalCharges] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [promoCode, setPromoCode] = useState("");

  // For editing – store an item for editing (do not remove it from cart)
  const [editingItem, setEditingItem] = useState(null);

  const subcategoriesRef = useRef(null);

  // New state: visible count for gift boxes and handbags (load 5 at a time)
  const [visibleGiftBoxesCount, setVisibleGiftBoxesCount] = useState(5);
  const [visibleHandbagsCount, setVisibleHandbagsCount] = useState(5);

  // INITIAL DATA FETCH ON MOUNT
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  // When the category changes, reset the visible item counts.
  useEffect(() => {
    setVisibleGiftBoxesCount(5);
    setVisibleHandbagsCount(5);
  }, [selectedCategory]);

  // Effect to update basketTotal on cartItems changes.
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => {
      // Base: unit price * quantity
      let base = Number(item.details.price) * Number(item.quantity);
      // Sweets: if giftBox and selectedSweets exist, compute each sweet's price divided equally.
      let sweetsPrice = 0;
      if (item.type === "giftBox" && item.selectedSweets && item.selectedSweets.length > 0) {
        const count = item.selectedSweets.length;
        sweetsPrice =
          item.selectedSweets.reduce((acc, sweet) => acc + (Number(sweet.price) / count), 0) *
          Number(item.quantity);
      }
      // Matching handbags:
      let matchingTotal = 0;
      if (item.matchingHandbags && item.matchingHandbags.length > 0) {
        matchingTotal = item.matchingHandbags.reduce(
          (sum, mh) => sum + Number(mh.price) * Number(mh.quantity),
          0
        );
      }
      return sum + base + sweetsPrice + matchingTotal;
    }, 0);
    setBasketTotal(total);
  }, [cartItems]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/giftboxpage/categories`);
      setCategories(res.data);
      if (res.data.length > 0) {
        setSelectedCategory(res.data[0]._id);
      }
    } catch (error) {
      console.error(
        "Error fetching categories:",
        error.response?.data || error.message
      );
    }
    setLoading(false);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const [giftBoxRes, handbagRes] = await Promise.all([
        axios.get(`${BASE_URL}/api/giftboxpage/giftBoxes`),
        axios.get(`${BASE_URL}/api/giftboxpage/generalHandbags`),
      ]);
      setGiftBoxes(giftBoxRes.data);
      setHandbags(handbagRes.data);
    } catch (error) {
      console.error(
        "Error fetching products:",
        error.response?.data || error.message
      );
    }
    setLoading(false);
  };

  const scrollSubcategories = (direction, ref) => {
    if (ref.current) {
      const scrollAmount = 300;
      if (direction === "left") {
        ref.current.scrollLeft -= scrollAmount;
      } else {
        ref.current.scrollLeft += scrollAmount;
      }
    }
  };

  const filteredGiftBoxes = giftBoxes.filter(
    (gb) => gb.category?._id === selectedCategory
  );
  const filteredHandbags = handbags.filter(
    (hb) => hb.category?._id === selectedCategory
  );

  // Compute external state for a product:
  const getExternalState = (id, type) => {
    const item = cartItems.find((itm) => itm.id === id && itm.type === type);
    return {
      externalSelected: !!item,
      externalQuantity: item ? item.quantity : undefined,
      externalMatchingHandbags: (item && item.matchingHandbags) || [],
    };
  };

  // Callback when a product toggles selection.
  const handleSelectionChange = (id, type, data, selected, selectionData) => {
    setCartItems((prev) => {
      const existsIndex = prev.findIndex(
        (item) => item.id === id && item.type === type
      );
      if (selected) {
        if (existsIndex !== -1) {
          const newCart = [...prev];
          newCart[existsIndex] = { id, type, details: data, ...selectionData };
          return newCart;
        }
        return [...prev, { id, type, details: data, ...selectionData }];
      } else {
        return prev.filter((item) => !(item.id === id && item.type === type));
      }
    });
  };

  // Memoized update callback to prevent infinite loops.
  const handleUpdate = useCallback((id, type, selectionData) => {
    setCartItems((prev) => {
      let hasChanged = false;
      const updated = prev.map((item) => {
        if (item.id === id && item.type === type) {
          const newItem = { ...item, ...selectionData };
          if (JSON.stringify(newItem) !== JSON.stringify(item)) {
            hasChanged = true;
            return newItem;
          }
          return item;
        }
        return item;
      });
      return hasChanged ? updated : prev;
    });
  }, []);

  // Edit callback.
  const handleEditBox = (id, type) => {
    const item = cartItems.find((itm) => itm.id === id && itm.type === type);
    if (item) {
      setEditingItem(item);
      console.log("Editing item:", item);
    }
  };

  const handleDeleteBox = (id, type) => {
    setCartItems((prev) => prev.filter((item) => !(item.id === id && item.type === type)));
  };

  const handleCheckout = () => {
    console.log("Checkout with:", cartItems);
  };

  if (loading) {
    return (
      <>
        <Header />
        <Loader />
        <Footer />
      </>
    );
  }

  return (
    <div className={styles.mainContainer}>
      <Header />
      <div className={styles.heading0}>Gift Boxes</div>
      <div className={styles.contentContainer}>
        <div className={styles.leftSection}>
          {/* Categories Section */}
          <div>
            <div className={styles.heading}>Categories</div>
            <div className={styles.subcategoriesWrapper}>
              <FiChevronLeft
                className={styles.arrow}
                onClick={() => scrollSubcategories("left", subcategoriesRef)}
              />
              <div className={styles.subcategories} ref={subcategoriesRef}>
                {categories.map((cat) => (
                  <div
                    key={cat._id}
                    className={`${styles.subcategoryCard} ${
                      selectedCategory === cat._id ? styles.active : ""
                    }`}
                    onClick={() => setSelectedCategory(cat._id)}
                  >
                    <img src={cat.image?.url} alt={cat.name} className={styles.subcategoryImage} />
                    <p className={styles.subcategoryName}>{cat.name}</p>
                  </div>
                ))}
              </div>
              <FiChevronRight
                className={styles.arrow}
                onClick={() => scrollSubcategories("right", subcategoriesRef)}
              />
            </div>
          </div>
          {/* Product Listing */}
          <div>
            <div className={styles.heading}>Gift Boxes</div>
            <div className={styles.productsList}>
              {filteredGiftBoxes.length > 0 ? (
                filteredGiftBoxes.slice(0, visibleGiftBoxesCount).map((gb) => {
                  const extState = getExternalState(gb._id, "giftBox");
                  return (
                    <GiftBoxAndBulkTemplate
                      key={gb._id}
                      id={gb._id}
                      name={gb.name}
                      description={gb.description}
                      price={gb.price}
                      minOrderQuantity={gb.minOrderQuantity}
                      image={gb.image}
                      type="giftBox"
                      matchingHandbags={gb.matchingHandbags || []}
                      onSelectionChange={handleSelectionChange}
                      onUpdate={handleUpdate}
                      data={gb}
                      externalSelected={extState.externalSelected}
                      externalQuantity={extState.externalQuantity}
                      externalMatchingHandbags={extState.externalMatchingHandbags}
                    />
                  );
                })
              ) : (
                <p>No gift boxes available in this category.</p>
              )}
            </div>
            {filteredGiftBoxes.length > visibleGiftBoxesCount && (
              <button
                className={styles.loadMore}
                onClick={() => setVisibleGiftBoxesCount(visibleGiftBoxesCount + 5)}
              >
                Load More
              </button>
            )}

            <div className={styles.heading1}>General Handbags</div>
            <div className={styles.productsList}>
              {filteredHandbags.length > 0 ? (
                filteredHandbags.slice(0, visibleHandbagsCount).map((hb) => {
                  const extState = getExternalState(hb._id, "handbag");
                  return (
                    <GiftBoxAndBulkTemplate
                      key={hb._id}
                      id={hb._id}
                      name={hb.name}
                      price={hb.price}
                      minOrderQuantity={hb.minOrderQuantity}
                      image={hb.image}
                      type="handbag"
                      matchingHandbags={[]} // No matching for handbags
                      onSelectionChange={handleSelectionChange}
                      onUpdate={handleUpdate}
                      data={hb}
                      externalSelected={extState.externalSelected}
                      externalQuantity={extState.externalQuantity}
                      externalMatchingHandbags={extState.externalMatchingHandbags}
                    />
                  );
                })
              ) : (
                <p>No handbags available in this category.</p>
              )}
            </div>
            {filteredHandbags.length > visibleHandbagsCount && (
              <button onClick={() => setVisibleHandbagsCount(visibleHandbagsCount + 5)}>
                Load More
              </button>
            )}
          </div>
        </div>

        <div className={styles.rightSection}>
          <GiftBoxCartRight
            cartItems={cartItems}
            basketTotal={basketTotal}
            additionalCharges={additionalCharges}
            deliveryCharges={deliveryCharges}
            discount={discount}
            promoCode={promoCode}
            handleCheckout={handleCheckout}
            handleEditBox={handleEditBox}
            handleDeleteBox={handleDeleteBox}
            onClearCart={() => setCartItems([])}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainGiftBoxes;