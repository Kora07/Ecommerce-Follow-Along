const { Router } = require('express');
const mongoose = require("mongoose");
const { productUpload } = require('../../multer');
const userModel = require("../Model/userModel");
const productModel = require('../Model/Productmodel');
const productRouter = Router();
const path = require('path')

// Products

productRouter.get("/get-product", async (request, response) => {
    try{
        const productfind = await productModel.find();
        console.log(productfind);
        
        if(!productfind){
            return response.status(400).json({message:"No products found"});
        }
        
        const products = productfind.map((product) => {
            return {
                id: product._id,
                name: product.name,
                description: product.description,
                category: product.category,
                tags: product.tags,
                price: product.price,
                stock: product.stock,
                email: product.email,
                images: product.images,
                createdAt: product.createdAt,
                seller: product.seller,

            };
        });

        response.json({
            info: productfind
        })

        return  products
        
    }
    catch(err){
        console.log(err);
    }
});

productRouter.post("/post-product", productUpload.array('files'), async(req, res) => {
    const {name, description, category, tags, price, stock, email, seller} = req.body;
    const images = req.files.map((file) => file.path);

    if(!seller){
        return res.status(400).json({message:"Seller not found"});
    }
    
    if(images.length === 0){
        return res.status(400).json({message:"Please upload atleast one image"});
    }
    
    try{
        
        const newProduct = await productModel.create({
            name,
            description,
            category,
            tags,
            price,
            stock,
            email,
            seller,
            images,        });
        
        res.status(200).json({
            message:"Product added successfully",
            product: newProduct
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }

});


productRouter.put('/edit-product/:id', productUpload.array('files',10), async (req, res) => {

    try {
        const { id } = req.params;
        console.log(id);
        
        const { name, description, category, tags, price, stock, email } = req.body;
        const existingProduct = await productModel.findById(id)

        if (!existingProduct){
            res.status(400).json({
                message:"product does not exist"
            })
        }
    
        let updateimages = existingProduct.images;

        if (req.files && req.files.length>0) {
            updateimages = req.files.map((img) => {
                return `/product/${path.basename(img.path)}`
            })
        }

        existingProduct.name = name;
        existingProduct.description = description;
        existingProduct.category = category;
        existingProduct.tags = tags;
        existingProduct.price = price;
        existingProduct.stock = stock;
        existingProduct.email = email;
        existingProduct.images = updateimages;

        await existingProduct.save()

        res.status(200).json({
            product: existingProduct
        })

    }
    catch (err) {
        console.log('error in updating', err)
    }

})

productRouter.delete('/delete-product/:id', async (req,res)=>{
    try {
        const { id } = req.params;
        const existingProduct = await productModel.findById(id);

        if(!existingProduct) {
            res.status(400).json({
                message:"product does not exist"
            })
        }
        await existingProduct.deleteOne()

        res.status(200).json({
            message: "product successfully deleted",
        })
    }
    catch(error) {
        console.log('error in delete')
    }
})


// Cart

productRouter.post('/post-cart', async (request, response) => {

    const { email, productId, productname, quantity } = request.body;

    try {
        if (!email) {
            return response.status(404).json({
                message: "missing email field"
            })
        }
       
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return response.status(400).json({
                message:'product ID is invalid'
            })
        }  
        if (quantity === undefined || quantity <= 0) {
            return response.status(400).json({
                message: 'product is unavailable'
            })
        }

        const findUser = await userModel.findOne({ email: email });
        
        if (!findUser) {
            return response.status(440).json({
                message:'user does not exist'
            })
        }
        
        const findProduct = await productModel.findById(productId);
        
        if (!findProduct) {
            return response.status(400).json({
                message: 'product does not exist'
            })
        }

        const cartproductId = findUser.cart.findIndex(i => i.productId.toString() === productId);
  
        if (cartproductId >- 1) {
            findUser.cart[cartproductId].quantity += quantity;
        }
        else {
            findUser.cart.push({ productId, productname, quantity });
        }

        await userModel.updateOne(
            { email },
            { $set: { cart: findUser.cart } }
        );

        response.status(200).json({ message: "Product added to cart" });


    }
    catch(error) {
        console.log("error in cart", error);
    }
})

productRouter.get("/get-cart", async(req, res)=>{
    try{
        const { email } = req.query;

        if (!email) {
            return res.status(404).json({message:"email is required"});
        }

        const user = await userModel.findOne({ email }).populate("cart.productId");

        if(!user){
            return res.status(404).json({message:"User not found"});
        }

        return res.status(200).json({
            message: "cart successfully retrieved",
            userCart: user.cart,
        })
    }
    catch (error){
        console.log(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
})

productRouter.put('/edit-cart', async (request, response) => {
    const { email, productId, quantity } = request.body;

    try {
        if (!email || !productId || quantity === undefined) {
            return response.status(400).json({
                message: "Missing fields"
            });
        }

        const findUser = await userModel.findOne({ email });
        if (!findUser) {
            return response.status(404).json({ message: "User not found" });
        }

        const findProduct = await productModel.findOne({ _id: productId });
        if (!findProduct || findProduct.stock <= 0) {
            return response.status(404).json({ message: "Product not available" });
        }

        const findCartProduct = findUser.cart.find(
            item => String(item.productId) === String(productId)
        );

        if (!findCartProduct) {
            return response.status(404).json({ message: "Product not found in cart" });
        }

        if (quantity <= 0) {
            // Remove from cart
            findUser.cart = findUser.cart.filter(
                item => String(item.productId) !== String(productId)
            );
        } else {
            // Update quantity
            findCartProduct.quantity = quantity;
        }

        await findUser.save({ validateBeforeSave: false });

        return response.status(200).json({ message: "Cart successfully edited" });
    } catch (error) {
        console.log(error);
        return response.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = productRouter;