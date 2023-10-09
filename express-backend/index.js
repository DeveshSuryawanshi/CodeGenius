const express = require("express");
const cors = require("cors");
const { QuestionRouter } = require("./Routes/question.routes");
const { connection } = require("./db");
require("dotenv").config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/questions", QuestionRouter)

app.get("/", async(req, res) =>{
    res.setHeader("Content-type", "text/html");
    res.send("<h1>Welcome to the Interview Question Server Api</h1>")
})

app.listen(PORT, async() =>{
    try {
        await connection;
        console.log("Connected to the database");
        console.log("Server is Running on port 8080");
    } catch (error) {
        console.log(error);
    }
})