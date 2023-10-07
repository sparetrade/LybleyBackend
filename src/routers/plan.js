const express=require("express");
const router= express.Router();
const Plan=require("../models/plans");


router.post("/addPlan",async(req,res)=>{
    try{
       let body=req.body;
       let data=new Plan(body);
       let data1=await data.save();
       res.json({status:true,msg:"Plan added"});
    }catch(err){
     res.status(400).send(err);
    }
});

router.get("/getPlans",async(req,res)=>{
    try{
       let data=await Plan.find({});
       res.send(data);
    }catch(err){
       res.status(400).send(err);
    }
})

router.get("/getPlanBy/:id",async(req,res)=>{
   try{
      let _id=req.params.id;
      let data=await Plan.findById(_id);
      res.send(data);
   }catch(err){
      res.status(400).send(err);
   }
})

router.delete("/deletePlan/:id",async(req,res)=>{
   try{
      let _id=req.params.id;
      let data=await Plan.findByIdAndDelete(_id);
      res.json({status:true,msg:"Deteled"});
   }catch(err){
      res.status(500).send(err);
   }
})

router.patch("/updatePlan/:id",async(req,res)=>{
   try{
      let _id=req.params.id;
      let body=req.body;
      let data=await Plan.findByIdAndUpdate(_id,body);
      res.json({status:true,msg:"Updated"});
   }catch(err){
      res.status(500).send(err);
   }
})

module.exports=router;