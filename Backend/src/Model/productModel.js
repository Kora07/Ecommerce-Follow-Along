const [model, Schema] = require("mongoose");

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please enter a product name!"]
    },
    description: {
        type: String,
        required: [true, "Please enter a product description!"]
    },
    category: {
        type: String,
        required: [true, "Please enter a product category!"]
    },
    price: {
        type: Number,
        required: [true, "Please enter a product price!"]
    },
    tags: {
        type: [String],
        required: [true, "Please enter at least one product tag!"]
    },
    images: {
        type: [String],
        required: [true, "Please upload a product image!"]
    },
    stock: {
        type: Number,
        required: [true, "Please enter a product quantity!"]
    },
    email: {
        type: String,
        required: [true, "Please enter the email of the product owner!"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
},
{
    timestamps: true,
})

const productModel = model("Product", productSchema);

module.exports = productModel;