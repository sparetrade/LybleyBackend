const mongoose=require("mongoose");

const contactSchema=new mongoose.Schema({
      name:{type:String},
      contact:{type:Number},
      email:{type:String},
      message:{type:String},
      website:{type:String},
      resume:{type:String}
},{timestamps:true});

const ContactModel= mongoose.model("contact",contactSchema);

module.exports=ContactModel;
