import dotenv from 'dotenv';
import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser';
import authRouter from './Controllers/authController.js'
import { verifySupabaseToken } from './Middleware/verifySupabaseToken.js'

dotenv.config(); 
const port = process.env.PORT;
const app = express();

app.use(bodyParser.json());

app.use(cors({ origin: "*" }))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use("/", authRouter);

app.get("/", (req, res) => {
    res.send("Server is Live!");
});

app.get("/testEnvironmentVariables", (req, res) => {
    res.send(`ENV Var 'testVar' => ${process.env.testVar}`);
});

app.get("/testJWTAuthentication", verifySupabaseToken, (req, res) => {
    res.json({
    message: 'Hello, authenticated user!',
    user: req.user,
  });
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});