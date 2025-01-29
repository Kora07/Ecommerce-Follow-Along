import React from "react"
import ProductCard from './productCard'
import "./main.css"

export default function Product() {
    return (
        <>
            <div className="main">
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </>
    )
}