const {Router} = require("express");
const userModel = require("../Model/userModel")
const {upload} = require("../../multer")

const router = Router();

router.post("/create-user", upload.single("file"), async(request, response) => {
    const [name, email, password] = request.body;
    const userEmail = await userModel.findOne({email});
    if (userEmail) {
        return next(new ErrorHandler("User already exists", 400))
    }

    const fileName = request.file.fileName;
    const fileUrl = request.join(fileName);

    brcypt, hash(password, 10, async (error, hash) => {
        await userModel.create ({
            name: name,
            email: email,
            password: hash,
            avatar: fileUrl,
        })
        console.log(hash)
    })

});

module.exports = router;