// const ErrorHandler = require("../utils/ErrorHandler");
// const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");

require('dotenv').config({
    path:'../Config/.env'}
)

const auth = async (req, res, next) => {
    const tokenauth = req.cookie.autherization;
    const secret = process.env.secretkey;

    jwt.verify(token, secret, function(err, decoded) {
        if (err) {
            console.log("error authorizing", err)
        }
        else {
            const finduser = decoded.email;
            req.user = finduser;
            next();
        }
    });
}

module.exports = auth;