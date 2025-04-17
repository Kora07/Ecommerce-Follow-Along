const { Router } = require("express");
const auth = require('../Middleware/auth');
const user=require("../Model/userModel");
const mongoose = require("mongoose");
const orderModel = require("../Model/orderSchema");
const rolemiddleware = require('../Middleware/role');
const paypal = require('paypal-rest-sdk');

const orderRouter = Router();

require("dotenv").config({
    path: "../Config/.env",
});

paypal.configure({
    mode: 'sandbox',
    client_id: process.env.PAYPAL_CLIENT_ID,
    client_secret: process.env.PAYPAL_CLIENT_SECRET
});

orderRouter.get("/get-order", async (request, response) => {
    try {
        const info = await orderModel.find();

        response.status(200).json({
            message: "Success",
            orders: info,
        })
    }
    catch (error) {
        console.log(error);
        response.status(500).json({
            message: "Internal server error",
            error: error,
        })
    }
})

orderRouter.post("/post-order/:email", async (req, res) => {
    const orderInformation = req.body;
    const { email } = req.params;

    try {
        // Find the user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const { orderItems, shippingAddress } = orderInformation;

        if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
            return res.status(400).json({ message: 'Order items are required.' });
        }

        if (!shippingAddress) {
            return res.status(400).json({ message: 'Shipping address is required.' });
        }

        const totalAmount = orderItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        const paymentData = {
            intent: "sale",
            payer: { payment_method: "paypal" },
            transactions: [
                {
                    amount: {
                        total: totalAmount.toFixed(2),
                        currency: "INR"
                    },
                },
            ],
            redirect_urls: {
                return_url: "http://localhost:3000/success",
                cancel_url: "http://localhost:3000/cancel",
            },
        };

        paypal.payment.create(paymentData, async (error, payment) => {
            if (error) {
                console.error('PayPal payment creation failed:', error);
                return res.status(500).json({ message: 'Payment creation failed' });
            }

            const orderPromises = orderItems.map(async (item) => {
                const order = new orderModel({
                    user: user._id,
                    orderItems: [item],
                    shippingAddress,
                    totalAmount,
                    paymentID: payment.id,
                });
                return order.save();
            });

            const createdOrders = await Promise.all(orderPromises);

            // Clear user's cart
            user.cart.splice(0, user.cart.length);
            await user.save();

            return res.status(201).json({
                message: 'Orders placed and cart cleared successfully.',
                orders: createdOrders,
                payment,
            });
        });

    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
});


orderRouter.put("/cancel-order/:id", async (request, response) => {
    const { id } = request.params;

    try {
        const updatedOrder = await orderModel.findByIdAndUpdate(
            id, { status: "Cancelled" }, { new: true }
        );

        if (!updatedOrder) {
            return response.status(404).json({ message: "order not found" });
        }

        response.status(200).json({
            message: "order cancelled successfully",
            order: updatedOrder,
        });
    } 
    catch (error) {
        console.log(error);
        response.status(500).json({
            message: "internal server error",
            error: error,
        });
    }
});

orderRouter.delete("/delete-order/:id", async (request, response) => {
    const { id } = request.params;

    try {
        const deletedOrder = await orderModel.findByIdAndDelete(id);

        response.status(200).json({
            message: "order successfully deleted",
            order: deletedOrder,
        })
    }
    catch (error) {
        response.status(500).json({
            message: "internal server error",
            error: error,
        })
    }
})

orderRouter.post('/verify-payment', auth, async (req, res) => {
    const { orderId } = req.user;

    paypal.payment.get(orderId,async(error, payment)=>{
        if (error){
            res.status(500).json({
                message: "there is error"
            })
        }
        if (payment.state!=="approved"){
            res.status(500).json({ 
                message: "cancel payment"
            })
        }
        await orders.findByIdAndUpdate(orderId, { orderStatus: ['paid'] })  
    })
})






module.exports = orderRouter;
