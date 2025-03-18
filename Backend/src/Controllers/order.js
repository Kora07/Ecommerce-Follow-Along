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
} )


module.exports = orderRouter;