const jwt=require("jsonwebtoken")
const blackListModel=require("../models/blacklist.model")

async function authUser(req,res,next){
    const token=req.cookies.token
    if(!token){
        return res.status(401).json({message:"token not found"});
    }
    const isBlackListed=await blackListModel.findOne({token})
    if(isBlackListed) return res.status(400).json({message:"invalid token"})
    try{
        const decoded=jwt.verify(token,process.env.JWT_TOKEN);
        req.user=decoded; //add a new property user in the req which contains all the data from decoded
        next();
    }
    catch(err){
        return res.status(401).json({message:"invalid token"});
    }
}

module.exports={authUser}