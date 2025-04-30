// import React from "react";
// import styles from "./giftBoxNew.module.css";
// import Header from "../../../components/header/header";
// import Footer from "../../../components/footer/footer";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// const GiftBoxNew = () => {
//   return (
//     <div className={styles.container}>
// <div className={styles.header}>
//         <Header />
//     </div>   

//     <div className={styles.Title}>
//     <p className={styles.titleText}>
//         Gift Boxes
//     </p>
//     </div>

// <div className={styles.content}>
        
// <div className={styles.catagory}>


// </div>
        
// <div className={styles.cards}>

// <div className={styles.card1}>



// </div>

// </div>

// </div>


// <div className={styles.footer}>
// <Footer />
// </div>

// </div>
// );
// }   

// export default GiftBoxNew;

import React, { useState } from "react";
import styles from "./giftBoxNew.module.css";
import Header from "../../../components/header/header";
import Footer from "../../../components/footer/footer";
import { useNavigate } from "react-router-dom";
import giftboximg from "./img/Giftbox3.jpeg";
const GiftBoxNew = () => {
  const [selectedBoxes, setSelectedBoxes] = useState([]);
  const [comment, setComment] = useState("");

  const giftBoxes = [
    {
      id: 1,
      name: "Wedding Box",
      price: 50,
      image:  giftboximg,
      description: "Includes assorted mithai and more",
      designs: [
        giftboximg,
        giftboximg,
        giftboximg,
      ],
    },
    {
      id: 2,
      name: "Birthday Box",
      price: 35,
      image:  giftboximg,
      description: "Includes a plush toy and treats",
      designs: [],
    },
    {
      id: 3,
      name: "Baby Box",
      price: 45,
      image:  giftboximg,
      description: "Includes baby clothes & toy",
      designs: [],
    },
  ];

  const addBox = (box, quantity) => {
    const updatedBoxes = [...selectedBoxes];
    const existing = updatedBoxes.find((b) => b.id === box.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      updatedBoxes.push({ ...box, quantity });
    }
    setSelectedBoxes(updatedBoxes);
  };

  const removeBox = (id) => {
    setSelectedBoxes(selectedBoxes.filter((b) => b.id !== id));
  };

  const totalPrice = selectedBoxes.reduce(
    (acc, box) => acc + box.price * box.quantity,
    0
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Header />
      </div>

      <div className={styles.titleSection}>
        <p className={styles.titleText}>GiftBoxes for your loved one or something else</p>
      </div>

      <div className={styles.content}>
        <div className={styles.mainSection}>
          <div className={styles.filters}>
            <button>Wedding</button>
            <button>Birthday</button>
            <button>Baby</button>
            <button>Get Well</button>
            <button>Thank You</button>
          </div>

          <div className={styles.cards}>
            {giftBoxes.map((box) => (
              <div key={box.id} className={styles.card}>
                <img src={box.image} alt={box.name} className={styles.boxImage} />
                <h3>{box.name}</h3>
                <p>{box.description}</p>
                <p><strong>${box.price.toFixed(2)}</strong></p>
                {box.designs.length > 0 && (
                  <div className={styles.designs}>
                    {box.designs.map((design, index) => (
                      <img
                        key={index}
                        src={design}
                        alt={`design-${index}`}
                        className={styles.designImage}
                      />
                    ))}
                  </div>
                )}
                <select onChange={(e) => addBox(box, Number(e.target.value))}>
                  {[1, 2, 3, 4, 5].map((q) => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </select>
                <button onClick={() => addBox(box, 1)}>Select</button>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.sidebar}>
          <h3>Your Selection</h3>
          {selectedBoxes.map((box) => (
            <div key={box.id} className={styles.selectedBox}>
              <img src={box.image} alt={box.name} />
              <div>
                <p>{box.name}</p>
                <p>Qty: {box.quantity}</p>
                <p>Total: ${box.price * box.quantity}</p>
              </div>
              <button onClick={() => removeBox(box.id)}>Remove</button>
            </div>
          ))}

          <textarea
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>

          <div className={styles.totalSection}>
            <p>Total: ${totalPrice.toFixed(2)}</p>
            <button className={styles.checkoutButton}>Checkout</button>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default GiftBoxNew;
