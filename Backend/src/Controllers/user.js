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

userRouter.get('/get-one-user', async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ 
                message: 'Email is required!' 
            });
        }

        let decodedEmail = email;
        try {
            decodedEmail = jwt.verify(email, secret);
        } 
        catch (error) {
            console.error("Error decoding JWT:", error);
        }

        const user = await userModel.findOne({ email: decodedEmail.email });

        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        const { password, ...userDetails } = user.toObject();
        res.json({ user: userDetails });
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


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

userRouter.put("/edit-address", async (request, response) => {
    try {
        const { address } = request.body;
        const email = request.query.email;

        if (!email || !address) {
            return response.status(400).json({ message: "Email and address are required." });
        }

        const updatedUser = await userModel.findOneAndUpdate(
            { email: email },
            { $push: { addresses: address } },
            { new: true }
        );

        if (!updatedUser) {
            return response.status(404).json({ message: "User not found." });
        }

        response.status(200).json({
            message: "Address updated successfully",
            user: updatedUser
        });

    } 
    catch (error) {
        console.error("Error updating address:", error);
        response.status(500).json({ message: "Internal Server Error" });
    }
});

userRouter.put("/update-selected-address", async (request, response) => {
    const { email, selectedIndex } = request.body;

    if (!email || selectedIndex === undefined) {
        return response.status(400).json({ message: "Email and selectedIndex are required." });
    }

    try {
        const updatedUser = await userModel.findOneAndUpdate(
            { email: email },
            { $set: { selectedAddress: selectedIndex } },
            { new: true }
        );

        if (!updatedUser) {
            return response.status(404).json({ message: "User not found." });
        }

        response.status(200).json({
            message: "Selected address updated successfully",
            user: updatedUser
        });
    } catch (error) {
        console.error("Error updating selected address:", error);
        response.status(500).json({ message: "Internal Server Error" });
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
        } 
        else {
            return res.status(400).json({ message: "Invalid password" });
        }
    });
});

module.exports = userRouter;