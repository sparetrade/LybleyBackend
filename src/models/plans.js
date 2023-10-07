const mongoose=require("mongoose");

const planSchema=new mongoose.Schema({
      planName:{type:String},
      price:{type:Number},
      appliances:{type:Array},
      plus:{type:Array}
},{timestamps:true});

const PlanModel=new mongoose.model("Plan",planSchema);

module.exports=PlanModel;