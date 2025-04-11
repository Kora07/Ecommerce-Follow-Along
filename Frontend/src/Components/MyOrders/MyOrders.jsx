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

    const handleOrderCancel = async (id) => {
        try {
            const response = await axios.put(`http://localhost:3000/order/cancel-order/${id}`);
    
            if (response.status === 200) {
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === id ? { ...order, status: "Cancelled" } : order
                    )
                );
            }
        } catch (error) {
            console.log("Error cancelling order", error);
        }
    };
    

    return (
        <>
            <h1 className="ordersTitle"> Orders </h1>
            <div className="ordersPageContainer">
                {orders.map((order, index) => (
                    <div key={index} className="orderSingle">
                        <div>

                            {order.status === "Cancelled" ? (
                                <h2 style={{textDecoration: "line-through"}}> {order.productName} </h2>
                            ) : (

                                <h2> {order.productName} </h2>
                            )}

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
                        <div>

                            {order.status === "Cancelled" ? (
                                <> </>
                            ) : (
                                <button className="orderCancelButton" onClick={() => handleOrderCancel(order._id)}> Cancel </button>
                            )}

                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default MyOrders;