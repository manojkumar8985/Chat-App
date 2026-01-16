import Users from "../Models/User.js";
import jwt from "jsonwebtoken";
import { upsertStreamUser } from "../simply.js";



export const signup = async (req, res) => {
  const { userName, password, email } = req.body;
  if (!userName || !password || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const ram = Math.floor(Math.random() * 100 + 1);
  const avatar = `1.jpeg`;
  try {
    const user1 = new Users({
      userName,
      email,
      password,
      pic: avatar,
    });
    await user1.save();
    const token = jwt.sign({ userId: user1._id }, process.env.JWT_TOKEN, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });


 try {
  await upsertStreamUser({
    id: user1._id.toString(),
    name: userName,
    image: avatar || "",
  });
} catch (e) {
  console.error(e);
}


    res.status(201).json({ message: "User created successfully", token });
  } catch (e) {
    console.error(e);
  }
}



export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // ✅ Validate input
    if (!userName || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // 🔍 Find user by username
    const user = await Users.findOne({ userName });
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    // 🔐 Check password
    const isMatch = await user.matchpass(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    // 🪙 Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_TOKEN,
      { expiresIn: "7d" }
    );

    // 🍪 Set cookie
    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    // ✅ Success response
    res.status(200).json({ message: "Login successful." });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("jwt")
  res.status(201).json({ message: "passss" });
}

export const onboard = async (req, res) => {
  const userId = req.user._id;
  const { fullName, bio, nativeLanguage, learningLanguage, location, pic } = req.body;

  if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      {
        fullName,
        bio,
        nativeLanguage,
        learningLanguage,
        location,
        pic,
        isOnBoard: true,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user in Stream
    await upsertStreamUser({
      id: updatedUser._id.toString(),
      name: updatedUser.fullName,
      image: updatedUser.pic || "",
    });

    res.status(200).json({ message: "Onboarding successful", user: updatedUser });
  } catch (error) {
    console.error("Onboarding error:", error);
    if (error.name === "StreamChatError") {
      return res.status(500).json({ message: "Error updating user in Stream" });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};