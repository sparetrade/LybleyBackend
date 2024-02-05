const mongoose=require("mongoose");

const verificationDetailsSchema=new mongoose.Schema({
    technicianId:{type:String},
    verificationDetails:{type:Object },
},{timestamps:true})

const VerificationDetailsModal=  mongoose.model("verificationDetails",verificationDetailsSchema);

module.exports=VerificationDetailsModal;