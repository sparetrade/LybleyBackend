const mongoose=require("mongoose");

const assignComplaintSchema=new mongoose.Schema({
     technicianId:{type:String},
     userId:{type:String},
     complaintId:{type:String},
     technicianInfo:{type:Object},
     userInfo:{type:Object},
     complaintInfo:{type:Object},
},{timestamps:true});

const assignComplaintModel=new mongoose.model("assignComplaint",assignComplaintSchema);

module.exports=assignComplaintModel;