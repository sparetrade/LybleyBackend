const mongoose=require("mongoose");

const adminSchema=new mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,default:"ADMIN"},
},{timestamps:true})

const AdminModel=  mongoose.model("admin",adminSchema);

module.exports=AdminModel;