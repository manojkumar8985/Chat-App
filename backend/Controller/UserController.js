import Users from "../Models/User.js";
import jwt from "jsonwebtoken";
import FriendRequest from "../Models/FriendRequest.js"
export const homepage = async (req, res) => {
  try {
    const currentUserId = req.user._id;

    const friendsIds = req.user.friend || [];

    const recommendedUsers = await Users.find({
      _id: {
        $ne: currentUserId,     // exclude me
        $nin: friendsIds        // exclude my friends
      },
      isOnBoard: true           // ✅ correct field name
    }).select("-password");

    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.error("Error in homepage controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const friendpage = async (req, res) => {
  try {
    const user = await Users.findById(req.user.id)
      .select("friend")
      .populate("friend", "userName pic nativeLanguage learningLanguage");

    res.status(200).json(user.friend);
  } catch (error) {
    console.error("Error in getMyFriends controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }

}
export const friend_request = async (req, res) => {
  try {
    const myId = req.user.id;
    const recipientId = req.params.id;

    // Prevent sending a request to yourself
    if (myId === recipientId) {
      return res
        .status(400)
        .json({ message: "You can't send a friend request to yourself" });
    }

    // Check if recipient exists
    const recipient = await Users.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    // Check if already friends
    if (recipient.friend.includes(myId)) {
      return res
        .status(400)
        .json({ message: "You are already friends with this user" });
    }

    // Check if a friend request already exists (in either direction)
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });

    if (existingRequest) {
      return res
        .status(400)
        .json({
          message: "A friend request already exists between you and this user",
        });
    }

    // Create a new friend request
    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(201).json(friendRequest);
  } catch (error) {
    console.error("Error in sendFriendRequest controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const Accept_friend = async (req, res) => {
  let {id}=req.params
  let reqUser=await FriendRequest.findById(id)
  if(!reqUser){return res.status(404).json({ message: "user not found" });}
  if(reqUser.recipient.toString()!==req.user.id){return res.status(404).json({ message: " not auth for accepting request" });}
  reqUser.status="accepted"
  await reqUser.save()
  await Users.findByIdAndUpdate(reqUser.sender, {
      $addToSet: { friend: reqUser.recipient },
    });
    await Users.findByIdAndUpdate(reqUser.recipient, {
      $addToSet: { friend: reqUser.sender },
    });
     res.status(200).json({ message: "Friend request accepted" });
}
export const GetFriendRequest=async(req,res)=>{
  try {
    const incomingReqs = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate("sender", "userName pic nativeLanguage learningLanguage");

    const acceptedReqs = await FriendRequest.find({
      sender: req.user.id,
      status: "accepted",
    }).populate("recipient", "userName pic");

    res.status(200).json({ incomingReqs, acceptedReqs });
  } catch (error) {
    console.error("Error in getPendingFriendRequests controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export async function getOutgoingFriendReqs(req, res) {
  try {
    const outgoingRequests = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",
    }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");

    res.status(200).json(outgoingRequests);
  } catch (error) {
    console.error("Error in getOutgoingFriendReqs controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}