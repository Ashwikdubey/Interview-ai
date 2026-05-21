const userModel=require("../models/user.model");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs")
const blacklistTokenModel=require("../models/blacklist.model")

async function registerUserController(req,res){
    const{username,password,email}=req.body || {};
    if(!username || !password || !email){
        return res.status(404).json({message:"please provide username email and password"});
    }
    const userAlreadyExists=await userModel.findOne({
        $or:[{username},{email}] //returns user object if username or email exits otherwise null
    })
    if(userAlreadyExists) return res.status(404).json({message:"user already exists with this email or usrrname"});
    const hashedPassword=await bcrypt.hash(password,10);
    const user=await userModel.create({
        username,
        password:hashedPassword,
        email
    })

    const token=jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_TOKEN,{expiresIn:"1d"})

    res.cookie("token", token);
    res.status(201).json({
        message:"user registered successfully",
        user:{
            username:user.username,
            id:user._id,
            email:user.email
        }
    })
}

async function loginUserController(req,res){
    const{email,password}=req.body || {};
    if(!email || !password) return res.status(400).json({message:"pleases provide email and password"})
    const user=await userModel.findOne({email})
    if(!user) return res.status(400).json({message:"invalid email or password"});
    const isPasswordValid=await bcrypt.compare(password,user.password);
    if(!isPasswordValid) return res.status(400).json({message:"user not found"});
    const token=jwt.sign({
        username:user.username,
        id:user._id
    },process.env.JWT_TOKEN,{expiresIn:"1d"})
    res.cookie("token",token);
    res.status(201).json({
        message:"user logged in successfully",
        user:{
            username:user.username,
            id:user._id,
            email:user.email
        }
    })
}

async function logoutUserController(req,res){
    const token=req.cookies.token
    if(token){
        await blacklistTokenModel.create({token});
    }
    res.clearCookie("token")
    res.status(200).json({message:"user logged out successfully"})
}

async function getMeUserController(req,res){
    const user=await userModel.findById(req.user.id);
    res.status(200).json({
        message:"user fetched successfully",
        user:{
            username:user.username,
            id:user._id,
            email:user.email
        }
    })
}

module.exports={registerUserController,loginUserController,logoutUserController,getMeUserController};