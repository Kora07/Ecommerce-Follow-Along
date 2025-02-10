import React, { useState, useEffect } from "react";
import "./productCard.css";

const imageArray = [
  "https://picsum.photos/seed/picsum/200/300",
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/200",
];

export default function ProductCard() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % imageArray.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className="container">
      <div className="productImage">
        <img src={imageArray[index]} alt="Product"/>
      </div>

      <div className="title">Product</div>

      <div className="price">
        <h6>$19.99</h6>
      </div>

      <div className="description">Description</div>

      <div className="button">
        <button className="buy">Buy</button>
      </div>
    </div>
  );
}
