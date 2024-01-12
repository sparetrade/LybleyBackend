const mongoose=require("mongoose");

const blogSchema=new mongoose.Schema({
      title:{type:String},
      description:{type:String},
      image:{type:String}
},{timestamps:true});

const blogModel=new mongoose.model("blogLybley",blogSchema);

module.exports=blogModel;