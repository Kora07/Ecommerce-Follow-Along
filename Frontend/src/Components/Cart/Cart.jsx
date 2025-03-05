import React, { useEffect, useState } from "react";
import CartComponent from "./CartComponent";
import axios from "axios";

function Cart() {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userEmail = "jack123@gmail.com";

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
            } catch (err) {
                console.error("Error fetching cart:", err);
                setError("Failed to load cart");
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []); // Dependency array ensures it runs only once

    console.log("Cart State:", cart);

    const updateQuantity = async (productId, newQuantity) => {
        if (newQuantity <= 0) return;

        try {
            await axios.put("http://localhost:3000/product/edit-cart", {
                email: userEmail,
                productId,
                quantity: newQuantity,
            });

            // Fetch updated cart after update
            const response = await axios.get(`http://localhost:3000/product/get-cart?email=${userEmail}`);
            setCart(response.data.userCart); // Ensure full update from backend
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) return <p>Loading cart...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="cartContainerMain">
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
    );
}

export default Cart;
