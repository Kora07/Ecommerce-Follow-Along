import React from 'react'
import "./CartComponent.css"

function CartComponent({ product, updateQuantity }) {
    return (
        <>
            <div className="singularCartComponent">
                
                <div className="singularCartComponentImage">
                <img 
                    src={product.productId.images[0]}
                    alt={product.productId.name}
                    style={{ width: "100px", borderRadius: "20px" }}
                />


                </div>

                <div className="singularCartComponentDeets">
                    <h2> {product.productId.name} </h2>
                    <p> Delivery Time: Placeholder Time </p>
                    
                    <div className="singularCartComponentQuantity">
                        <button onClick={() => updateQuantity(product.productId._id, product.quantity - 1)}> - </button>
                        <p>{product.quantity}</p>
                        <button onClick={() => updateQuantity(product.productId._id, product.quantity + 1)}> + </button>
                    </div>

                </div>

                <div className="singularCartComponentPrice">
                    ${product.productId.price}
                </div>
            
            </div>
        </>
    )
}

export default CartComponent;
