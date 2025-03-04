const { Router } = require("express");
const userModel = require("../Model/userModel");
const { upload } = require("../../multer");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const userRouter = Router();
const path = require("path");

require('dotenv').config({
    path:'./src/config/.env'
});

const secret = process.env.PRIVATEKEY;

userRouter.get("/get-user", async (request, response) => {
    try {
        const userInfo = await userModel.find();

        response.status(200).json({
            message: "users successfully retrieved",
            users: userInfo
        })
    }
    catch (error) {
        console.log("Error fetching users", error)
        response.status(500).json({ message: "Internal Server Error" });
    }
})


userRouter.post("/create-user", upload.single('file'), async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!password) {
            return res.status(400).json({ error: "Password is required!" });
        }

        if (!req.file) {
            return res.status(400).json({ error: "Avatar image is required!" });
        }

        if (!req.file) {
            return res.status(400).json({ error: "Avatar image is required!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
            avatar: {
                public_id: req.file.filename,
                url: `/uploads/${req.file.filename}`,
            }
        });

        res.status(201).json({ message: "User created successfully", user });
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
    


userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const check = await userModel.findOne({ email });

    if (!check) {
        return res.status(400).json({ message: "User not found" });
    }

    bcrypt.compare(password, check.password, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Error comparing passwords" });
        }

        if (result) {
            jwt.sign({ email }, secret, { expiresIn: "1h" }, (err, token) => {
                if (err) {
                    return res.status(500).json({ message: "Error generating token" });
                }
                res.status(200).json({ token });
            });
        } else {
            return res.status(400).json({ message: "Invalid password" });
        }
    });
});

module.exports = userRouter;