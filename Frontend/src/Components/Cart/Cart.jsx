import React, { useEffect, useState } from "react";
import CartComponent from "./CartComponent";
import axios from "axios";
import "./Cart.css"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode"

function Cart() {
    const [cart, setCart] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const user = useSelector((state) => state.auth.user);
    console.log("User email:", user);
    
    const mainDecoder = jwtDecode(user);
    console.log("Sub decode: ", mainDecoder.email);

    const userEmail = mainDecoder.email;

    const navigate = useNavigate();


    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/product/get-cart?email=${userEmail}`);
                console.log("API Response:", response.data);

                if (Array.isArray(response.data.userCart)) {
                    setCart(response.data.userCart);
                } else {
                    setCart([]);
                }
            } 
            catch (error) {
                console.error("Error fetching cart:", error);
                setError("Failed to load cart");
            } 
            finally {
                setLoading(false);
            }
        };
        
        const handleGetAddress = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/user/get-one-user?email=${userEmail}`);
                console.log("Addresses Fetched: ");
                setAddresses(response.data.user);
                console.log(addresses);
            }
            catch (error) {
                console.log("Error fetching addresses", error);
            }
        }
        
        fetchCart();
        handleGetAddress();
        console.log(cart)
    }, []);

    console.log("Cart State:", cart);

    const updateQuantity = async (productId, newQuantity) => {
        if (newQuantity == 0) {
            try {
                
            }
            catch (error) {
                console.log(error);
            }
        };

        try {
            await axios.put("http://localhost:3000/product/edit-cart", {
                email: userEmail,
                productId,
                quantity: newQuantity,
            });

            // Fetch updated cart after update
            const response = await axios.get(`http://localhost:3000/product/get-cart?email=${userEmail}`);
            setCart(response.data.userCart);
        } 
        catch (error) {
            console.log(error);
        }
    };

    if (loading) return <p>Loading cart...</p>;
    if (error) return <p>{error}</p>;

    // const handleGetAddress = async () => {
    //     try {
    //         const response = await axios.get(`http://localhost:3000/user/get-one-user?email=${email}`);
    //         console.log(response.user.addresses);
    //         setAddresses(response.user.addresses);
    //     }
    //     catch (error) {
    //         console.log("Error fetching addresses", error);
    //     }
    // }

    return (
        <>
            <div className="cartMain">
                <div className="cartContents">
                    {cart.length > 0 ? (
                        cart.map((item) => (
                            <CartComponent
                                key={item._id}
                                product={item}
                                updateQuantity={updateQuantity}
                            />
                        ))
                    ) : (
                        <p>Your cart is empty</p>
                    )}
                </div>

                <div className="cartCheckout">
                    <h3> Your total: placeholderPrice </h3>
                    <div className="cartCheckoutButtonDiv">
                        <button className="cartCheckoutButton"onClick={() => {
                            navigate("/selectaddress")
                        }}> Select Address </button>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Cart;
