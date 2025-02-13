const {Router} = require('express')
const productModel = require('./../Model/productModel')
const {productUpload} = require('./../../multer')

const productRouter=Router();

productRouter.get('/get-products',async (req,res)=>{
    try{
        const products = await productModel.find({})
        if (!products){
            return res.status(400).json({message:"No products foud"})
        }
        console.log(products)
        return res.status(200).json({products:products})
    }catch(err){
        console.log(err)
    }
})

productRouter.post('/post-product',productUpload.array('images', 10),async (req,res)=>{
    const {name,email,description,category,stock,tags,price} = req.body;
    const images=req.files.map(file=>file.path);
    try{
        const seller = await productModel.findOne({email:email});
        if (!seller){
            return res.status(400).json({message:"Seller not found"})
        }
        if (images.length===0){
            return res.status(400).json({message:"Please upload atleast one images"})
        }
        const newProduct = await productModel.create({
            name:name,
            description:description,
            category:category,
            tags:tags,
            price:price,
            stock:stock,
            email:email,
            images:images
        })

        res.status(200).json({message:"Product created successfully",product:newProduct})
    }catch(err){
        console.log(err)
    }

})

productRouter.put("/edit-product/:id", productUpload.array("images", 10), async (request, response) => {
    try {
        const id = request.params;
        const existingProduct = await productModel.findOne({ _id: id});

        if (!existingProduct){
            return response.status(404).json({message: "Product not found"});
        }

        const {name, description, category, tags, price, stock, email} = request.body;

        const uploadImage = existingProduct.images;
        if (request.files && request.files.length > 0) {
            uploadImage = request.files.map((img) => {
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
        existingProduct.images = uploadImage;

        await existingProduct.save()

        response.status(200).json({product: existingProduct});

    }

    catch (error) {
        console.log(error)
    }

})

productRouter.delete("/delete-product/:id", async (request, response) => {
    try {
        const { id } = request.params
        const existingProduct = await productModel.findMyId(id);

        if (!existingProduct) {
            return response.status(404).json({ message: "Product not found" });
        }

        await existingProduct.deleteOne(id)
    }
    catch (error) {
        console.log(error)
    }
})

module.exports=productRouter;