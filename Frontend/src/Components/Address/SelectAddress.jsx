import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SelectAddress.css";

function SelectAddress() {
    const userEmail = "jack123@gmail.com";
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null); // It should start as null to indicate nothing is selected
    const navigate = useNavigate();

    useEffect(() => {
        const handleGetAddress = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/user/get-one-user?email=${userEmail}`);
                console.log("Addresses Fetched: ");
                setAddresses(response.data.user?.addresses || []); // Fix: Only set the addresses
            }
            catch (error) {
                console.log("Error fetching addresses", error);
            }
        }

        handleGetAddress();
    }, []);

    const handleProceed = () => {
        if (selectedAddress === null) {
            alert("Please select an address.");
            return;
        }

        const addressToSend = addresses[selectedAddress]; // Using the index of the selected address
        navigate("/orderconfirmation", {
            state: {
                selectedAddress: addressToSend,
            },
        });
    };

    return (
        <>
            <div className="selectAddress">
                <div className="cartAddresses">
                    <h2> Select Your Address: </h2>

                    <div className="cartSelectAddress">
                        {addresses.length > 0 ? (
                            addresses.map((addr, index) => (
                                <div key={index}>
                                    <input
                                        type="radio"
                                        name="selectedAddress"
                                        value={index}
                                        id={`address-${index}`}
                                        onChange={() => setSelectedAddress(index)} // Update the index
                                    />
                                    <label htmlFor={`address-${index}`}>
                                        <h3>{addr.addressType}:</h3>
                                        {addr.address1}, {addr.address2} <br />
                                        {addr.city}, {addr.country} - {addr.zipCode}
                                    </label>
                                </div>
                            ))
                        ) : (
                            <p>No address available</p>
                        )}
                    </div>
                </div>

                <div className="proceedFromAddress">
                    <button className="proceedToCheckoutButton" onClick={handleProceed}> Proceed to Checkout </button>
                </div>
                
            </div>
        </>
    );
}

export default SelectAddress;
