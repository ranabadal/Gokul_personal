
import React, { useState, useEffect } from "react";
import styles from "./saved_newaddress.module.css";

const SavedNewAddress = () => {
    const [addresses, setAddresses] = useState([]);
    const [currentAddress, setCurrentAddress] = useState({ id: '', province: '', city: '', area: '', landmark: '' });
    const [isEditing, setIsEditing] = useState(false);

    // Fetch saved addresses from backend
    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    console.error('No token found');
                    return;
                }
                const response = await fetch('http://localhost:8080/addresses', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const result = await response.json();
                if (result.success) {
                    setAddresses(result.data);
                } else {
                    console.error(result.message);
                }
            } catch (error) {
                console.error('Error fetching addresses:', error);
            }
        };

        fetchAddresses();
    }, []);

    const handleChange = (e) => {
        setCurrentAddress({
            ...currentAddress,
            [e.target.name]: e.target.value
        });
    };

    const handleAddOrUpdateAddress = async () => {
        console.log("Current Address:", currentAddress); // Log the current address data

        if (isEditing) {
            // Update existing address
            try {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    console.error('No token found');
                    return;
                }
                const response = await fetch(`http://localhost:8080/addresses/${currentAddress._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(currentAddress)
                });
                const result = await response.json();
                if (result.success) {
                    const updatedAddresses = addresses.map(address =>
                        address._id === currentAddress._id ? result.data : address
                    );
                    setAddresses(updatedAddresses);
                    setIsEditing(false);
                    setCurrentAddress({ _id: '', province: '', city: '', area: '', landmark: '' });
                } else {
                    console.error(result.message);
                }
            } catch (error) {
                console.error('Error updating address:', error);
            }
        } else {
            // Add new address
            try {
                const token = localStorage.getItem('jwtToken');
                if (!token) {
                    console.error('No token found');
                    return;
                }
                const response = await fetch('http://localhost:8080/addresses/add', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(currentAddress)
                });
                const result = await response.json();
                if (result.success) {
                    setAddresses([...addresses, result.data]);
                    setCurrentAddress({ _id: '', province: '', city: '', area: '', landmark: '' });
                } else {
                    console.error(result.message);
                }
            } catch (error) {
                console.error('Error adding address:', error);
            }
        }
    };

    const handleEditAddress = (address) => {
        setCurrentAddress(address);
        setIsEditing(true);
    };

    const handleRemoveAddress = async (id) => {
        try {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                console.error('No token found');
                return;
            }
            const response = await fetch(`http://localhost:8080/addresses/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorDetails = await response.json();
                throw new Error(errorDetails.message || 'Failed to delete the address');
            }

            const result = await response.json();
            if (result.success) {
                setAddresses(addresses.filter(address => address._id !== id));
            } else {
                console.error(result.message);
            }
        } catch (error) {
            console.error('Error removing address:', error.message); // Enhanced error logging
        }
    };

    return (
        <div className={styles.saved_newaddress}>
            <div className={styles.saved_newaddress_content}>
                <div className={styles.saved_newaddress_content_left}>
                    <div className={styles.saved_newaddress_content_left_heading}>Saved Address</div>
                  <div className={styles.saved_newaddress_content_left_address_container}>
                  {addresses.map(address => (
                        <div key={address._id} className={styles.saved_newaddress_content_left_address}>
                            <div className={styles.saved_newaddress_content_left_address_name}>{address.province}, {address.city}</div>
                            <div className={styles.saved_newaddress_content_left_address_location}>{address.area}, {address.landmark}</div>
                            <div className={styles.saved_newaddress_content_left_address_btn}>
                                <div className={styles.saved_newaddress_content_left_address_btn_left}>
                                    <button onClick={() => handleEditAddress(address)}>Edit Address</button>
                                </div>
                                <div className={styles.saved_newaddress_content_left_address_btn_right}>
                                    <button onClick={() => handleRemoveAddress(address._id)}>Remove Address</button>
                                </div>
                            </div>
                        </div>
                    ))}
                  </div>
                </div>
                <div className={styles.saved_newaddress_content_right}>
                    <div className={styles.saved_newaddress_content_right_heading}>{isEditing ? "Edit Address" : "Add New Address"}</div>
                    <div className={styles.saved_newaddress_content_right_form}>
                        <div className={styles.saved_newaddress_content_right_form_input}>
                            <input type="text" name="province" placeholder="Province" value={currentAddress.province} onChange={handleChange} />
                        </div>
                        <div className={styles.saved_newaddress_content_right_form_input}>
                            <input type="text" name="city" placeholder="City" value={currentAddress.city} onChange={handleChange} />
                        </div>
                        <div className={styles.saved_newaddress_content_right_form_input}>
                            <input type="text" name="area" placeholder="Area" value={currentAddress.area} onChange={handleChange} />
                        </div>
                        <div className={styles.saved_newaddress_content_right_form_input}>
                            <input type="text" name="landmark" placeholder="Landmark" value={currentAddress.landmark} onChange={handleChange} />
                        </div>
                    </div>
                    <div className={styles.saved_newaddress_content_right_btn}>
                        <button onClick={handleAddOrUpdateAddress}>{isEditing ? "Save Changes" : "Save Address"}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SavedNewAddress;
