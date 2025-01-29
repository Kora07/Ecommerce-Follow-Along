import React from "react"
import "./productCard.css"

export default function ProductCard() {
    return (
        <>
            <div className="container">
                <div className="productImage">
                    
                </div>

                <div className="title">
                    Product
                </div>

                <div className="price">
                    <h6> $19.99 </h6>
                </div>

                <div className="description">
                    Description
                </div>

                <div className="button">
                    <button className="buy"> Buy </button>
                </div>
            </div>
        </>
    )
}