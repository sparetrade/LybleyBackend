const mongoose=require("mongoose");

const verificationDetailsSchema=new mongoose.Schema({
    technicianId:{type:String},
    subscriptionId:{type:String},
    userId:{type:String},
    planId:{type:String},
    verificationDetails:{type:Array },
    // verificationDetails: [{
    //     name: { type: String },
    //     description: { type: String },
    //     images: [{ type: String }]  
    //   }]
},{timestamps:true})

const VerificationDetailsModal=  mongoose.model("verificationDetails",verificationDetailsSchema);

module.exports=VerificationDetailsModal;