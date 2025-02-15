import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./navbar.css"

function Navbar() {

    const navigator = useNavigate();

    return (
        <>
            <div className="navbar">
                {/* Home Link */}
                <div onClick={() => {
                    navigator("/")
                }}> 
                    Home 
                </div>

                <div className="rightSide">
                    {/* Product Link */}
                    <div onClick={() => {
                        navigator("/product")
                    }}> 
                        Products 
                    </div>

                    {/* Link for Product Form to Add Products */}
                    <div onClick={() => {
                        navigator("/productForm")
                    }}> 
                        Add a Product 
                    </div>
                    
                    {/* Link for Cart */}
                    <div onClick={() => {
                        navigator("/cart")
                    }}> 
                        Cart 
                    </div> 
                
                </div>
            </div>
        </>
    )
}

export default Navbar