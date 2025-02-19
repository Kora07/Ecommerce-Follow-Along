const {Router} = require('express');
const { productupload } = require('../../multer');
const productModel = require('../Model/Productmodel');
const productrouter = Router();
const path=require('path')

productrouter.get("/get-product", async (req, res) => {
    try{
       const productfind= await productModel.find();
         console.log(productfind);
        if(!productfind){
            return res.status(400).json({message:"No products found"});
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

            };
        });

        return  products
        
    }
    catch(err){
        console.log(err);
    }
});

productrouter.post("/post-product",productupload.array('files'),async(req, res) => {
    const {name, description, category, tags, price, stock, email} = req.body;
    const images = req.files.map((file) => file.path);
    try{
        const product = await productModel.findone({email:email});
        if(!seller){
            return res.status(400).json({message:"Seller not found"});
        }
        if(images.length === 0){
            return res.status(400).json({message:"Please upload atleast one images"});
        }
        await productModel.create({
            name:name,
            description:description,
            category:category,
            tags:tags,
            price:price,
            stock:stock,
            email:email,
            images:images
        });
    }
    catch(err){
        console.log(err);
    }
    res.status(200).json({message:"Product added successfully"});

});

productrouter.post("/cart", async(req, res) => {
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

productrouter.get("/getcart", async(req, res)=>{
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
    const {id}=req.params
    console.log(id)
    const {name, description, category, tags, price, stock, email} = req.body;
    const existproduct=await productModel.findById(id)

    if(!existproduct){
        res.status(400).json({message:"product does not exist"})
    }
    const updateimages=existproduct.images
    if(req.files && req.files.length>0){
        updateimages=req.files.map((img)=>{
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

    res.status(200).json({product:existproduct})

    }
    catch(err){
        console.log('error in updating')
    }

})

productrouter.delete('/delete-product/:id',async(req,res)=>{
    try{
        const {id}=req.params
        const existproduct=await productModel.findById(id)

        if(!existproduct){
            res.status(400).json({message:"product does not exist"})
        }

        await existproduct.deleteOne()

    }catch(err){
        console.log('error in delete')
    }
})

module.exports = productrouter;