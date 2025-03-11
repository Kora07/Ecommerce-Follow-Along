const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    address: {
        country: { type: String },
        city: { type: String },
        address1: { type: String },
        address2: { type: String },
        zipCode: { type: Number },
        addressType: { type: String },
    },
    status: {
        type: String,
        required: true,
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;

// Order status
// Product
// Price
// Address
