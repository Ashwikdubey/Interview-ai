const mongoose=require("mongoose")


const blacklistTokenSchema=new mongoose.Schema({
    token:{
        type:String,
        required:[true,"Token required"]
    }
},{
    timestamps:true
})

const tokenBlackListModel=mongoose.model("blackListTokens",blacklistTokenSchema);
module.exports=tokenBlackListModel