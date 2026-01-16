import express from "express";
import "dotenv/config"
import Auth from "./router/auth.js"
import User from "./router/user.js"
import Chat from "./router/chat.js"
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

const app=express()
const port=process.env.PORT

async function main(){
    await mongoose.connect(process.env.MONGO_URL)
}

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}))

app.use(express.json())
app.use(cookieParser())
app.use("/auth",Auth)
app.use("/user",User)
app.use("/chat",Chat)
app.listen(port,()=>{
    main().then(()=>{
    }).catch(()=>{})
    
})