const express=require("express");
const router= express.Router();
const AdminModel=require("../models/admin");

router.post("/createAdmin",async(req,res)=>{
    try{
       let body=req.body;
       let data=new AdminModel(body);
       await data.save();
       res.json({status:true,msg:"Created"});
    }catch(err){
       res.status(400).send(err);
    }
 });

 router.post("/loginAdmin",async(req,res)=>{
    try{
       let body=req.body;
       let data=await AdminModel.findOne({email:body.email,password:body.password});
       if(data){
         res.send(data);
       }else{
         res.status(404).json({status:false,msg:"Not found"});
       }
    }catch(err){
       res.status(400).send(err);
    }
 });

 module.exports=router;
