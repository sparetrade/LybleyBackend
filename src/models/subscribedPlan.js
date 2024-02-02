const mongoose=require("mongoose");

const subscribedPlanSchema=new mongoose.Schema({
   userId:{type:String},
   name:{type:String},
   contact:{type:Number},
   email:{type:String},
   location:{type:String},
   unit:{type:Number},
   homeSize:{type:Number},
   planName:{type:String},
   planDetail:{type:Object},
   planPrice:{type:Number},
   planTime:{type:String},
   realEstateAgentName:{type:String},
   closingDate:{type:String},
   status:{type:String,default:"DISAPPROVED"},
},{timestamps:true})

const subscribedPlanModel=new mongoose.model("subscription",subscribedPlanSchema);

module.exports=subscribedPlanModel;