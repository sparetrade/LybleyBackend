
const express=require("express");
const router= express.Router();
const Verification=require("../models/subscribeVerification");
router.post("/assignSubscriberVerification",async(req,res)=>{
    try{
      let body=req.body;
      let data=new Verification(body);
      await data.save();
    //   await Complaint.findByIdAndUpdate(body.complaintInfo._id,{status:"ASSIGNED"});
      res.json({status:true,msg:"Technician Assigned"});
    }catch(err){
      res.status(400).send(err);
    }
});


router.post("/updateAssignVerification",async(req,res)=>{
    try{
      let _id=req.params.id;
      let body=req.body;
      await AssignComplaint.findByIdAndUpdate({_id:body.assignId},{$set:{status:"CLOSE","complaintInfo.status":"CLOSE"}});
    //   await Complaint.findByIdAndUpdate({_id:body.complaintId},{status:"CLOSE"});
      res.json({status:true,msg:"Closed"});
    }catch(err){
      res.status(500).send(err);
    }
});

 

 

router.get("/getAssinedVerificationByTechnician/:id",async(req,res)=>{
    try{
     let id=req.params.id;
     let data=await Verification.find({technicianId:id});
     res.send(data);
    }catch(err){
     res.status(400).send(err);
    }
});

router.get("/getAssignedVerificationBy/:id",async(req,res)=>{
    try{
     let _id=req.params.id;
     let data=await Verification.findById(_id);
     res.send(data);
    }catch(err){
     res.status(400).send(err);
    }
});

router.get("/getAllAssignedVerification",async(req,res)=>{
    try{
     let data=await Verification.find({});
     res.send(data);
    }catch(err){
     res.status(400).send(err);
    }
});
module.exports=router;