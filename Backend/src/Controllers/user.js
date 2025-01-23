const {Router} = require("express");
const userModel = require("./Model/userModel")

const router = Router();

router.post("/create-user", upload.single("file"), async(request, response) => {
    const [name, email, password] = request.body;
    const userEmail = await userModel.findOne({email});
    if (userEmail) {
        return next(new ErrorHandler("User already exists", 400))
    }
});

const filename = req.file.filename ;
const fileUrl = path.join(filename);

const user={
    name:name,
    email:email,
    password:password,
    avatar: fileUrl,
};

console.log(user);

module.exports = router;