import React, { useEffect, useState } from "react";
import "../index.css";

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/product/get-products")
        .then((res) => {
            if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            setProducts(data.products);
            setLoading(false);
        })
        .catch((err) => {
            console.error("❌ Error fetching products:", err);
            setError(err.message);
            setLoading(false);
        });
    }, []);

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
        <h1>Product List</h1>
        <ul>
            {products.map((product, index) => (
            <li key={index}>{product.name}</li>
            ))}
        </ul>
        </div>
    );
}

export default Home;
