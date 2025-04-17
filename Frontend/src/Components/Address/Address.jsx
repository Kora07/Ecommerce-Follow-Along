import React, { useState } from 'react'
import "./Address.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Address() {

    const { email } = useSelector((state) => state.auth.user) || {};
    const navigate = useNavigate();

    const [address, setAddress] = useState({
        country: "",
        city: "",
        address1: "",
        address2: "",
        zipCode: "",
        addressType: ""
    });

    const handleAddAddress = async () => {
        await axios.put(`http://localhost:3000/user/edit-address?email=${email}`, {
            address: address,
        })
        .then((response) => {
            console.log("Address successfully updated");
            navigate("/profile");
        })
        .catch((error) => {
            console.log("Error in updating address", error);
        })
    }
    

    return (
        <>
            <div className="addAddressContainer">

                <h1> Add an Address </h1>

                <div className="mainAddressPart">
                    <label> Country: </label>
                    <input type="text" onChange={(e) => {
                        setAddress((prev) => ({
                            ...prev,
                            country: e.target.value
                        }))
                    }} />

                    <label> City: </label>
                    <input type="text" onChange={(e) => {
                        setAddress((prev) => ({
                            ...prev,
                            city: e.target.value
                        }))
                    }} />

                    <label> Address Line 1: </label>
                    <input type="text" onChange={(e) => {
                        setAddress((prev) => ({
                            ...prev,
                            address1: e.target.value
                        }))
                    }} />

                    <label> Address Line 2: </label>
                    <input type="text" onChange={(e) => {
                        setAddress((prev) => ({
                            ...prev,
                            address2: e.target.value
                        }))
                    }} />

                    <label> Zipcode: </label>
                    <input type="text" onChange={(e) => {
                        setAddress((prev) => ({
                            ...prev,
                            zipCode: e.target.value
                        }))
                    }} />

                    <label> Address Type: </label>
                    <input type="text" onChange={(e) => {
                        setAddress((prev) => ({
                            ...prev,
                            addressType: e.target.value
                        }))
                    }} />

                    <button className="addAddressButton" onClick={handleAddAddress}> Add Address </button>
                
                </div>

            </div>
        </>
    )
}

export default Address;
