const express=require('express');
const connectDB = require('./src/Database/db');
// const userModel = require('./src/Model/userModel');
// const productModel = require('./src/Model/Productmodel');
const userRouter = require('./src/Controllers/user');
const productRouter = require('./src/Controllers/products');
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());

require('dotenv').config({
    path:'./src/Config/.env'
});

const PORT = process.env.port || 3000;
const URL = process.env.URL;

app.get('/', (req, res) => {    
    res.send('Hello World');
})

app.listen(PORT, async() => {
    try {
        await connectDB(URL);
        console.log(`Server is running on port ${PORT}`);
    }
    catch (err) {
        console.log(err);
    }
})

app.use('/user', userRouter);
app.use('/product', productRouter);