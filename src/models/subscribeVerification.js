const mongoose=require("mongoose");

const userPlanVerificationSchema=new mongoose.Schema({
     technicianId:{type:String},
     userId:{type:String},
     planId:{type:String},
     technicianInfo:{type:Object},
     userInfo:{type:String},
     planInfo:{type:Object},
     status:{type:String,default:"ASSIGNED"}
},{timestamps:true});

const userPlanVerificationModel=new mongoose.model("userPlanVerification",userPlanVerificationSchema);

module.exports=userPlanVerificationModel;