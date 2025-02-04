const {Router} = require("express");
const { productUpload } = require("../../multer");
const productRouter = Router();

productRouter.get("/", (request, response) => {
    response.send("Product Router");
})

productRouter.post("/", productUpload.array("files"), async (request, response) => {
    const {name, description, category, tags, price, stock, email} = request.body;
    const images = request.files.map(file => file.path);

    try {
        const seller = await productModel.findOne({email: email});

        if (!seller) {
            return response.status(400).json({error: "Seller not found"});
        }

        if (images.length ===  0) {
            return response.status(400).json({error: "Please upload at least one image"});
        }

        const newProduct = await new productModel({
            name: name,
            description: description,
            category: category,
            tags: tags,
            price: price,
            stock: stock,
            email: email,
            images: images,
        });

        response.status(200).json({message: "Product uploaded successfully", product: newProduct});

    }
    catch (error) {
        console.error("Error uploading product:", error);
    }
});

module.exports = productRouter;