import mongoose from "mongoose";
import bcrypt from "bcrypt";


const User=new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    fullName:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    bio:{
        type:String,
    },
    pic:{
        type:String,
        required:true
    },
    nativeLanguage:{
        type:String,
    },
    learningLanguage:{
        type:String, 
    },
    location:{
        type:String, 
    },
    isOnBoard:{
        type:Boolean,
        default:false
    },
    friend:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ]
},{timestamps:true})

User.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});


User.methods.matchpass = async function (enteredPassword) {
  const isPasswordCorrect = await bcrypt.compare(enteredPassword, this.password);
  return isPasswordCorrect;
};


const Users=mongoose.model("User",User)



export default Users;