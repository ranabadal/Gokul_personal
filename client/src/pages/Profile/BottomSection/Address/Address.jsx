import React, { useState } from "react";
import styles from "./Address.module.css";
import AboveHeader from "../../../../components/above_header/above_header";
import Header from "../../../../components/header/header";
import BelowHeader from "../../../../components/below_header/below_header";
import SavedNewAddress from "../../../../components/saved_newaddress/saved_newaddress";
import Footer from "../../../../components/footer/footer";

const Address = () => {
    const [savedAddresses, setSavedAddresses] = useState([
        {
            id: 1,
            name: "Kurukshetra, Haryana",
            location: "Opposite CG Office, New Road"
        },
        {
            id: 2,
            name: "Kurukshetra, Haryana",
            location: "Opposite CG Office, New Road"
        },
        {
            id: 3,
            name: "Kurukshetra, Haryana",
            location: "Opposite CG Office, New Road"
        },
        {
            id: 4,
            name: "Kurukshetra, Haryana",
            location: "Opposite CG Office, New Road"
        }
    ]);

    const handleEditAddress = (id) => {
        // Implement edit address logic
    };

    const handleRemoveAddress = (id) => {
        setSavedAddresses(savedAddresses.filter(address => address.id !== id));
    };

    const handleSaveAddress = (newAddress) => {
        setSavedAddresses([...savedAddresses, { ...newAddress, id: Date.now() }]);
    };

    return (
        <div className={styles.address}>

            <div className={styles.saved_address}>
                <SavedNewAddress
                    savedAddresses={savedAddresses}
                    onEditAddress={handleEditAddress}
                    onRemoveAddress={handleRemoveAddress}
                    onSaveAddress={handleSaveAddress}
                />
            </div>  
           
        </div>
    );
};  

export default Address;