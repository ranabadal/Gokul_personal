// import React, { useState } from "react";
// import styles from "./addressSelectionModal.module.css";

// const AddressSelectionModal = ({ addresses, onClose, onConfirm }) => {
//   const [selectedAddress, setSelectedAddress] = useState(addresses.length === 1 ? addresses[0]._id : null);

//   const handleAddressChange = (id) => {
//     setSelectedAddress(id);
//   };

//   const handleConfirmOrder = () => {
//     if (!selectedAddress) {
//       alert("Please select an address to proceed!");
//       return;
//     }
//     onConfirm(selectedAddress); // Pass the selected address back to the parent
//   };

//   return (
//     <div className={styles.modalOverlay}>
//       <div className={styles.modalContent}>
//         <h2>Select Address</h2>
//         <div className={styles.addressList}>
//           {addresses.map((address) => (
//             <div key={address._id} className={styles.addressItem}>
//               <input
//                 type="radio"
//                 id={address._id}
//                 name="selectedAddress"
//                 value={address._id}
//                 checked={selectedAddress === address._id}
//                 onChange={() => handleAddressChange(address._id)}
//               />
//               <label htmlFor={address._id}>
//                 <p>{`${address.province}, ${address.city}`}</p>
//                 <p>{`${address.area}, ${address.landmark}`}</p>
//               </label>
//             </div>
//           ))}
//         </div>
//         <div className={styles.modalActions}>
//           <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
//           <button onClick={handleConfirmOrder} className={styles.confirmButton}>Confirm Order</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddressSelectionModal;


import React, { useState } from "react";
import styles from "./addressSelectionModal.module.css";

const AddressSelectionModal = ({ addresses = [], onClose, onConfirm }) => {
  const [selectedAddress, setSelectedAddress] = useState(
    addresses.length === 1 ? addresses[0]._id : null
  );

  const handleAddressChange = (id) => {
    setSelectedAddress(id);
  };

  const handleConfirmOrder = () => {
    if (!selectedAddress) {
      alert("Please select an address to proceed!");
      return;
    }
    onConfirm(selectedAddress);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Select Address</h2>
        <div className={styles.addressList}>
          {addresses.map((address) => (
            <div key={address._id} className={styles.addressItem}>
              <input
                type="radio"
                id={address._id}
                name="selectedAddress"
                value={address._id}
                checked={selectedAddress === address._id}
                onChange={() => handleAddressChange(address._id)}
              />
              <label htmlFor={address._id}>
                <p>{`${address.province}, ${address.city}`}</p>
                <p>{`${address.area}, ${address.landmark}`}</p>
              </label>
            </div>
          ))}
        </div>
        <div className={styles.modalActions}>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
          <button onClick={handleConfirmOrder} className={styles.confirmButton}>
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressSelectionModal;