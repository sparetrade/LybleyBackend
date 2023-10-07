const mongoose=require("mongoose");

const registrationSchema=new mongoose.Schema({
    // location:{type:String,required:true},
    name:{type:String,required:true},
    // unit:{type:Number,required:true},
    email:{type:String,required:true},
    contact:{type:Number,required:true},
    role:{type:String,default:"USER"},
    otp:{type:String}
},{timestamps:true})

const RegistrationModel=new mongoose.model("Registration",registrationSchema);

module.exports=RegistrationModel;