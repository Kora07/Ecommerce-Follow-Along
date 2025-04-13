import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Productcard } from './Productcard';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/product/get-product');
                if (response.status === 200) {
                    setProducts(response.data.info);
                    console.log("Products: ", response.data.info);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.length === 0 ? (
                <p>No products available</p>
            ) : (
                products.map((product) => (
                    <Productcard
                        key={product._id} // Ensure this is unique
                        productId={product._id}
                        image={product.images} // Assuming images is an array of URLs
                        name={product.name}
                        price={product.price}
                        description={product.description}
                    />
                ))
            )}
        </div>
    );
};

export default Products;
