
import { createClient } from '@supabase/supabase-js'
import express from 'express'
import dotenv from 'dotenv';
dotenv.config();
const authRouter = express.Router();

const supabaseUrl = process.env.SUPABASE_PROJECT_URL
const supabaseKey = process.env.SUPABASE_API_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// later add Display Name and Phone number as well
authRouter.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        })
        return res.status(200).json({message: "Successfully Registered"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

authRouter.post("/login", async (req, res) => {
    try{
        const { email, password } = req.body;
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        if(error){
            return res.status(403).json({ message: "Invalid Credentials"});
        }
        return res.status(200).json({message: data})
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

export default authRouter;