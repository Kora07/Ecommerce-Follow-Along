import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Profile() {
    const user = useSelector((state) => state.auth.user);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }

        const getUserInfo = async () => {
            try {
                console.log("User: ", user)
                const response = await axios.get(`http://localhost:3000/user/get-one-user?email=${user}`);
                console.log(response.data);
                setUserData(response.data.user);
            } catch (error) {
                console.error("Error in retrieving user information:", error.response?.data || error.message);
            }
        };
        

        getUserInfo();
    }, [user, navigate]);

    if (!user) {
        return <p>Loading...</p>;
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
