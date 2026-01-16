import express from "express";
import {login,logout,signup,onboard} from "../Controller/AuthController.js"; 
import {protectRoute }from "../middleware/protect.js"

const app = express();


app.post("/signup", signup);
app.post("/login", login);
app.post("/logout", logout);
app.post("/onboard", protectRoute,onboard);

app.get("/me",protectRoute,(req,res)=>{
    res.status(200).json({success:true,user:req.user})
})


export default app;