import express from "express";
import {getStreamToken} from "../Controller/ChatController.js"; 
import {protectRoute }from "../middleware/protect.js"

const app = express();

app.use(protectRoute);

app.get("/token",getStreamToken)




export default app;