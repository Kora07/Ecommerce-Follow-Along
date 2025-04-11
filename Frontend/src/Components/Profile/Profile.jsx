import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";  // Import useSelector to access Redux store

function Profile() {
    const user = useSelector((state) => state.auth.user);  // Get user data from Redux store
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            // If the user is not logged in, redirect to the login page
            navigate("/login");
            return;
        }

        const getUserInfo = async () => {
            try {
                const response = await axios.get("http://localhost:3000/user/get-one-user", {
                    params: { email: user.email }
                });

                setUserData(response.data.user); // Assuming response.data.user contains user info
                console.log("User information successfully retrieved", response.data.user);
            } catch (error) {
                console.error("Error in retrieving user information", error);
            }
        };

        getUserInfo();
    }, [user, navigate]); // Add user as a dependency to ensure it runs when user is available

    if (!user) {
        return <p>Loading...</p>; // or redirect to login if user is not logged in
    }

    return (
        <div className="profileContainer">
            <div className="profileLeft">
                <img
                    src="https://preview.redd.it/i-got-bored-so-i-decided-to-draw-a-random-image-on-the-v0-4ig97vv85vjb1.png?width=1080&crop=smart&auto=webp&s=28c3ad73cff636f7ba478a0c19d734cd538949d4"
                    style={{ width: "300px", borderRadius: "24px" }}
                />
                <br /> <br />
                <h2 style={{ fontSize: "30px" }}>
                    {userData ? userData.name : "Loading..."}
                </h2>
            </div>

            <div className="profileRight">
                <div className="profileRightEmail">
                    Email: {userData ? userData.email : "Loading..."}
                </div>

                <div className="profileRightAddress">
                    <div className="profileRightAddressTop">
                        <h4> Addresses </h4>
                        <button className="profileAddAddress" onClick={() => navigate("/addaddress")}> Add an Address </button>
                    </div>

                    <span className="profileAddressSpecific">
                        {userData?.addresses?.length > 0 ? (
                            userData.addresses.map((addr, index) => (
                                <div key={index}>
                                    <h3> {addr.addressType}: </h3>
                                    {addr.address1}, {addr.address2} <br />
                                    {addr.city}, {addr.country} - {addr.zipCode}
                                </div>
                            ))
                        ) : (
                            "No address available"
                        )}
                    </span>

                </div>

                <div className="toMyOrders">
                    <button onClick={() => {navigate("/orders")}}> View Orders </button>
                </div>

            </div>
        </div>
    );
}

export default Profile;
