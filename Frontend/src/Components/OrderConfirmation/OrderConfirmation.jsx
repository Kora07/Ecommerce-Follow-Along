import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OrderConfirmation.css";
import { useNavigate } from "react-router-dom";

function OrderConfirmation() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userEmail = "jack123@gmail.com";
    
    const navigate = useNavigate();

    const savedAddress = JSON.parse(localStorage.getItem("selectedAddress"));

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/product/get-cart?email=${userEmail}`);
                console.log("API Response:", response.data);
                setCart(response.data.userCart || []);
            } catch (error) {
                console.error("Error fetching cart:", error);
                setError("Failed to load cart");
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    const cartTotal = cart.reduce((total, item) => {
        const price = item.productId?.price || 0; // Access price inside productId
        return total + price * (item.quantity || 1);
    }, 0);
    

    if (loading) return <p>Loading cart...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="orderMain">
            <div className="orderContents">
                <h2>Order Confirmation</h2>
                {cart.map((item) => (
                    <div key={item._id} className="orderItem">
                        <div className="orderItemDetails">
                            <h3>{item.productId.name || "No Name Available"}</h3>
                            <p>Quantity: {item.quantity || 1}</p>
                            <p>Price: ${item.productId.price ? item.productId.price.toFixed(2) : "N/A"}</p>
                            <p>Total: ${item.productId.price ? (item.productId.price * (item.quantity || 1)).toFixed(2) : "N/A"}</p>
                        </div>
                    </div>
                ))}


            </div>

            <div className="orderCheckout">
                <h3>Total: ${cartTotal.toFixed(2)}</h3>

                <div className="selectedAddress">
                    <h3>Shipping Address:</h3>
                    {savedAddress ? (
                        <p>
                            {savedAddress.address1}, {savedAddress.address2}, {savedAddress.city}, {savedAddress.country} - {savedAddress.zipCode}
                        </p>
                    ) : (
                        <p>No address selected</p>
                    )}
                </div>
                <div className="orderCheckoutButtonDiv">
                    <button className="orderCheckoutButton"> Confirm Order </button>
                </div>
            </div>
        </div>
    );
}

export default OrderConfirmation;
