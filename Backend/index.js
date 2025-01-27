const express = require("express");
const app = express();
const connectDatabase = require("./src/Database/database")

require("dotenv").config({
    path: "./src/Config/.env"
});
const port = process.env.port;
const url = process.env.databaseURL;

app.listen(port, async() => {
    try {
        await connectDatabase(url);
        console.log(`Server is running on port ${port}`);
    }
    catch(error) {
        console.log(error)
    }
})

app.get("/", (request, response) => {
    response.send("Nah, I'd win");
})