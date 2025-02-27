const { Router } = require('express');
const { productupload } = require('../../multer');
const productModel = require('../Model/Productmodel');
const productrouter = Router();
const path = require('path')

productrouter.get("/get-product", async (request, response) => {
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

productrouter.post("/post-product", productupload.array('files'), async(req, res) => {
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

productrouter.post("/post-cart", async(req, res) => {
    const {email, id, name, quantity} = req.body;

    try {
        if (!email || !id || !name || !quantity) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        
        const findEmail = await userModel.findOne({ email: "email"})
        if (!findEmail) {
            return res.status(404).json({ message: "User does not exist" });
        }
        if (!mongoose.types.objectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product id" });
        }

        if (quantity > 0 && !quantity) {
            return res.status(400).json({ message: "Invalid quantity" });
        }

        const findProduct = await productModel.findById(productId);
        if (!findProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        const cartProduct = await userModel.cart.findIndex((i) => {
            return i.productId === productId
        })
    }
    catch (error) {
        console.log(error);
    }
})

productrouter.get("/get-cart", async(req, res)=>{
    try{
        const email = req.body;
        if (!email) {
            return res.status(404).json({message:"user does not exist"});
        }
        const user = await userModel.findOne({email:email}).populate({
            path: 'cart.productId',
            model:productModel
        })
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
    }
    catch (error){
        console.log(error);
    }
})

productrouter.put('/edit-product/:id',productupload.array('files',10),async(req,res)=>{

    try{
        const { id } = req.params;
        console.log(id);
        const { name, description, category, tags, price, stock, email } = req.body;
        const existproduct = await productModel.findById(id)

        if(!existproduct){
            res.status(400).json({message:"product does not exist"})
    }
    
    const updateimages = existproduct.images;

    if (req.files && req.files.length>0) {
        updateimages = req.files.map((img) => {
            return `/product/${path.basename(img.path)}`
        })
    }
    existproduct.name=name
    existproduct.description=description
    existproduct.category=category
    existproduct.tags=tags
    existproduct.price=price
    existproduct.stock=stock
    existproduct.email=email
    existproduct.images=updateimages

   await existproduct.save()

    res.status(200).json({
        product: existproduct
    })

    }
    catch (err) {
        console.log('error in updating')
    }

})

productrouter.delete('/delete-product/:id',async(req,res)=>{
    try {
        const { id } = req.params;
        const existproduct = await productModel.findById(id);

        if(!existproduct){
            res.status(400).json({message:"product does not exist"})
        }

        await existproduct.deleteOne()

    }
    catch(err) {
        console.log('error in delete')
    }
})

module.exports = productrouter;