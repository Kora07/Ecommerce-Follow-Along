const { Router } = require("express");
const mongoose = require("mongoose");
const orderModel = require("../Model/orderSchema");

const orderRouter = Router();

orderRouter.get("/get-orders", async (request, response) => {
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

orderRouter.post("/post-order", async (request, response) => {
    const orderInformation = request.body;
    const { email }= request.params;

    try {
        const newInfo = new orderModel(orderInformation);
        await newInfo.save();

        response.status(200).json({
            message: "Order successful",
            order: newInfo,
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

module.exports = orderRouter;