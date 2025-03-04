// import React, { useState } from 'react'
// import "./Cart.css"
// import axios from 'axios';

// function Cart() {

//     const [email, setEmail] = useState();

//     const handleIncrement = () => {
//         const newquantityVal = quantityVal + 1;
//         setQuantityVal(newquantityVal);
//         updateQuantityVal(newquantityVal);
//     };

//     const handleDecrement = () => {
//         const newquantityVal = quantityVal > 1 ? quantityVal - 1 : 1;
//         setQuantityVal(newquantityVal);
//         updateQuantityVal(newquantityVal);
//     };

//     const updateQuantityVal = (quantity) => {
//         fetch('http://localhost:3000/product/edit-cart', {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 email:email,
//                 productId: _id,
//                 quantity:quantity,
//             }),
//         })
//             .then((res) => {
//                 if (!res.ok) {
//                     console.log('error in put req')
//                 }
//                 return res.json();
//             })
//             .then((data) => {
//                 console.log('quantityVal updated:', data);
//             })
//             .catch((err) => {
//                 console.error('Error updating quantityVal:', err);
//             });
//     };

//     return (
//         <>
//             <div className="cartContainer">
//                 <input type="text" onChange={(e) => {
//                     setEmail(e.target.value)
//                     console.log(email)
//                     }}/> <br />
//                 <button onClick={updateQuantityVal}> Update </button>
//             </div>
//         </>
//     )
// }

// export default Cart;


import React, { useState, useEffect } from "react";
import Cart from "./CartComponent";  // Import the Cart component
import axios from "axios";

function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [email, setEmail] = useState(""); // Email input for fetching cart

    const fetchCart = async () => {
        try {
            const response = await axios.post("http://localhost:3000/product/post-cart", { email: "jack123@gmail.com" });
            console.log("Cart data:", response.data);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };
    

    return (
        <div className="cart-page">
            <h2>Shopping Cart</h2>

            <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={fetchCart}>Get Cart</button>

            {cartItems.length > 0 ? (
                <Cart cartItems={cartItems} setCartItems={setCartItems} />
            ) : (
                <p>No items in cart.</p>
            )}
        </div>
    );
}

export default CartPage;
