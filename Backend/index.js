const express=require('express');
const connectDB = require('./src/Database/db');
const userModel = require('./src/Model/userModel');
const productModel = require('./src/Model/Productmodel');
const userrouter = require('./src/Controllers/user');
const productrouter = require('./src/Controllers/products');
const app=express();

app.use(express.json());

require('dotenv').config({
    path:'./src/config/.env'
});

const PORT=process.env.port || 5000;
const url=process.env.db_url;

app.get('/',(req,res)=>{   
    res.send('Hello World');
})

app.use('/auth',userrouter);

app.listen(PORT,async()=>{

try{
   await connectDB(url);
    console.log(`Server is running on port ${PORT}`);
}
catch(err){
    console.log(err);
}
    
})

app.use('/auth',userrouter);
app.use('/product',productrouter);