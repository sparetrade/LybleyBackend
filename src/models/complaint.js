const mongoose=require("mongoose");

const complaintSchema=new mongoose.Schema({
      userId:{type:String},
      user:{type:Object},
      applianceName:{type:String},
      partName:{type:String},
      description:{type:String},
      status:{type:String,default:"PENDING"},
      image:{type:String}
},{timestamps:true});

const complaintModel=new mongoose.model("complaint",complaintSchema);

module.exports=complaintModel;