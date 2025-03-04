import React, { useState, useEffect } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import axios from "axios";

export default function Cart({ cartItems, setCartItems }) {
    
    const handleUpdateQuantity = async (productId, email, newQuantity) => {
        try {
            const response = await axios.put("http://localhost:3000/product/edit-cart", {
                email: email,
                productId: productId,
                quantity: newQuantity,
            });

            console.log("Cart updated:", response.data);
            // Update local cart state
            setCartItems((prevCart) =>
                prevCart.map((item) =>
                    item._id === productId ? { ...item, quantity: newQuantity } : item
                )
            );
        } catch (error) {
            console.error("Error updating cart:", error);
        }
    };

    return (
        <div className="cart-container">
            {cartItems.map((item) => (
                <CartProduct key={item._id} item={item} onUpdateQuantity={handleUpdateQuantity} />
            ))}
        </div>
    );
}

function CartProduct({ item, onUpdateQuantity }) {
    const [quantity, setQuantity] = useState(item.quantity);
    
    const handleIncrement = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onUpdateQuantity(item._id, item.email, newQuantity);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            onUpdateQuantity(item._id, item.email, newQuantity);
        }
    };

    return (
        <div className="cart-product">
            <img src={item.images[0]} alt={item.name} className="product-image" />
            <div className="product-info">
                <h3>{item.name}</h3>
                <p>${item.price * quantity}</p>
                <div className="quantity-controls">
                    <button onClick={handleDecrement}>
                        <MdOutlineRemoveCircleOutline />
                    </button>
                    <span>{quantity}</span>
                    <button onClick={handleIncrement}>
                        <IoIosAddCircleOutline />
                    </button>
                </div>
            </div>
        </div>
    );
}
