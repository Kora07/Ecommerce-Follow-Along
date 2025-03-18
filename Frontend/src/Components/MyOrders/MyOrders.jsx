import axios from 'axios';
import React, { useState, useEffect } from 'react'
import "./MyOrders.css"

function MyOrders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const response = await axios.get("http://localhost:3000/order/get-orders");
                setOrders(response.data.orders)
                console.log(response.data.orders);
            }
            catch (error) {
                console.log("Error fetching orders", error)
            }
        }

        getOrders();
    }, [])

    return (
        <>
            <h1 className="ordersTitle"> Orders </h1>
            <div className="ordersPageContainer">
                {orders.map((order, index) => (
                    <div key={index} className="orderSingle">
                        <h2> {order.productName} </h2>
                        <h4> Quantity: {order.quantity} </h4>
                        <p> Order Status: <span> {order.status} </span> </p>

                        <br />
                        
                        {order.status === "Delivered" ? (
                            <p> Delivered To: </p> 
                        ) : (
                            <p> Delivery To: </p> 
                        )}
                        
                        <p id="orderAddress"> 
                            {order.address.address1}, {order.address.address2} <br />
                            {order.address.city}, {order.address.country} - {order.address.zipCode}
                        </p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default MyOrders;
