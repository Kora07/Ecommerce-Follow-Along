import React, { useEffect, useState, useNavigate } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

export default function ProductCard({product}) {
        
    const [imgIndex,setImgIndex] = useState(0);
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/productForm/${id}`);
    }

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/product/delete-product/${id}`);

            if (response.status === 200) {
                console.log('Product deleted successfully');
            }
        }
        catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setImgIndex((prev) => {
                console.log(prev + 1);
                return (prev + 1)%(product.image.length-1) ;
            });
        }, 2000);
    
        return () => clearInterval(interval); // Cleanup when unmounting
    }, [imgIndex]);



    return (
        <div>
            <div className='flex flex-col text-black'>
                
                <img src={product.image[imgIndex]} alt="" />
                <h2 className='text-black'>{product.name}</h2>
                <h4>
                    {product.description}
                </h4>
            </div>
            <div>
                <h2 className='text-black'>
                    ${product.price}
                </h2>
                <button> Buy Now </button>
                <button onClick={(id) => {handleDelete(id)}}> Delete </button>
                <button onClick={(id) => {handleEdit(id)}}> Edit </button>
            </div>
            
        </div>
    )
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.array.isRequired,
    }).isRequired,
};

