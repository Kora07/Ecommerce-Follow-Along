import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./navbar.css"

function Navbar() {

    const navigate = useNavigate();

    return (
        <>
            <div className="navbar">
                <button className="home" onClick={() => {
                    navigate("/home")
                }}>
                    Home 
                </button>
                <button className="products" onClick={() => {
                    navigate("/products")
                }}> 
                    Products 
                </button>
                <button className="addProduct" onClick={() => {
                    navigate("/productForm")
                }}> 
                    Add Product 
                </button>
                <button className="Profile" onClick={() => {
                    navigate("/profile")
                }}> 
                    Profile
                </button>
                <button className="Cart" onClick={() => {
                    navigate("/cart")
                }}> 
                    Cart 
                </button>
            </div>
        </>
    )
}

export default Navbar;