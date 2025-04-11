import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

export const Productcard = ({ image = [], name, price, description, productId }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    // const userEmail = useSelector((state) => state.user?.email); // Ensure user email is safely accessed
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.user);
    const userEmail = user?.email; // Safely access the email
    


    console.log("User email from Redux:", userEmail); // Debug the user email

    // Automatic image slider for product images
    useEffect(() => {
        if (image.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % image.length);
            }, 2000);

            return () => clearInterval(interval);
        }
    }, [image]);

    const currentImage = image.length > 0 ? image[currentIndex] : null;

    // Function to handle adding product to cart
    const handleAddToCart = async () => {
        if (!userEmail) {
            alert('Please log in to add items to your cart!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/products/post-cart', {
                email: userEmail,
                productId,
                productname: name,
                quantity: 1, // Default quantity
            });

            if (response.status === 200) {
                dispatch({
                    type: 'UPDATE_CART',
                    payload: response.data.cart,
                });
                alert('Product added to cart!');
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
            alert('Failed to add product to cart');
        }
    };

    return (
        <div className="bg-neutral-200 p-4 rounded-lg shadow-md flex justify-between flex-col">
            <div className="w-full">
                {currentImage ? (
                    <img
                        src={currentImage}
                        alt={name}
                        className="w-full h-56 object-cover rounded-lg mb-2"
                    />
                ) : (
                    <div className="w-full h-56 bg-gray-300 rounded-lg mb-2">No image available</div>
                )}
                <h1 className="text-lg font-bold">{name}</h1>
                <h3 className="text-sm opacity-50 line-clamp-2">{description}</h3>
            </div>

            <div className="w-full">
                <h1 className="text-lg font-bold my-2">${price}</h1>
                <button
                    className="w-full text-white px-4 py-2 rounded-md bg-neutral-900"
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};
