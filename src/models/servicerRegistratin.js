const mongoose=require("mongoose");

const servicerRegistrationSchema=new mongoose.Schema({
    servicerName:{type:String,required:true},
    businessPhone:{type:Number,required:true},
    businessAddress:{type:String,required:true},
    yearOfStartBusniess:{type:String},
    servicerWebsite:{type:String},
    betterBusinessBureauReviewPage:{type:String},
    role:{type:String,default:"TECHNICIAN"},
    otp:{type:String}
},{timestamps:true})

const servicerRegistrationModel=new mongoose.model("servicerRegistration",servicerRegistrationSchema);

module.exports=servicerRegistrationModel;