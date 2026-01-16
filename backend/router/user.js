import express from "express";
import {homepage,friendpage,friend_request,Accept_friend,GetFriendRequest,getOutgoingFriendReqs} from "../Controller/UserController.js"; 
import {protectRoute }from "../middleware/protect.js"

const app = express();

app.use(protectRoute);

app.get("/",homepage)
app.get("/friend",friendpage)

app.post("/friendRequest/:id",friend_request)
app.put("/friendRequest/:id/accept",Accept_friend)

app.get("/friendRequest",GetFriendRequest)
app.get("/OutgoingFriendRequest",getOutgoingFriendReqs)


export default app;