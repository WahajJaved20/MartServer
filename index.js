require("dotenv").config();
const cors = require("cors")
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(cors({ origin: "*" }))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.get("/", (req, res) => {
    res.send("Server is Live!");
});

app.get("/testEnvironmentVariables", (req, res) => {
    res.send(`ENV Var 'testVar' => ${process.env.testVar}`);
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});