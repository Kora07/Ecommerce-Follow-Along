const {Router} = require("express");
const userModel = require("../Model/userModel");
const { upload } = require("../../multer");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const userrouter = Router();
const path = require("path");

require('dotenv').config({
    path:'./src/config/.env'
});

const secret = process.env.private_key;

userrouter.post("/create-user", upload.single('file'), async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

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
    


userrouter.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const check= await userModel.findOne( {email:email });
    
    console.log(check);
    
    if (!check) {
        return res.status(400).json({
            message: "User not found"
        });
    }

    bcrypt.compare(password,check.password , function(err, result) {

        if (err) {
            return res.status(400).json({message:"Invalid bcrpyt compare"});
        }

        if (result) {
            jwt.sign({email:email},secret,(err,token)=>{
                if (err) {
                    return res.status(400).json({
                        message: "Invalid jwt"
                    });
                }

                console.log(token);
                res.status(200).json({token:token});    
            })
        }   
        else {
            return res.status(400).json({
                message: "Invalid password"
            });
        }
    });

})

module.exports = userrouter;