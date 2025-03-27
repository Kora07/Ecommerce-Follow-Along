const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");

require('dotenv').config({
    path:'../Config/.env'
});

const auth = async (req, res, next) => {
    const tokenauth = req.cookie.autherization;
    const secret = process.env.secretkey;

    jwt.verify(token, secret, function (err, decoded) {
        if (err) {
            console.log("error in auth middleware", err);
        }
        else{
            const findUser = decoded.email;
            req.user = findUser;
            next();
        }
    });
}

module.exports = auth;