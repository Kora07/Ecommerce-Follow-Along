const express=require('express');
const app=express();
const cors = require("cors");

const connectDB=require('./src/Database/database');
const userRouter=require('./src/Controllers/user');
const productRouter=require('./src/Controllers/products')

require('dotenv').config({
    path:'./src/Config/.env'
});

const port=process.env.port;
const url=process.env.databaseURL;

app.listen(3000,async ()=>{
    console.log(`Server is running on port ${port}`);
    try{
        await connectDB(url);
    }catch(error){
        console.log(error);
    }
})

app.use(cors());

// OR enable CORS for specific origin (your frontend URL)
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

app.use('/auth',userRouter)

app.use('/product',productRouter)

 

 