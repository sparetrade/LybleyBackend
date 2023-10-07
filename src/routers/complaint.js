const express=require("express");
const router= express.Router();
const Complaint=require("../models/complaint");
const AssignComplaint=require("../models/assignComplaint");

router.post("/createComplaint",async(req,res)=>{
   try{
      let body=req.body;
      let data=new Complaint(body);
      await data.save();
      res.json({status:true,msg:"Created"});
   }catch(err){
      res.status(400).send(err);
   }
});

router.get("/getAllComplaint",async(req,res)=>{
    try{
     let data=await Complaint.find({});
     res.send(data);
    }catch(err){
     res.status(400).send(err);
    }
});

router.get("/getComplaintBy/:id",async(req,res)=>{
    try{
     let _id=req.params.id;
     let data=await Complaint.findById(_id);
     res.send(data);
    }catch(err){
     res.status(400).send(err);
    }
});

router.get("/getComplaintByUser/:id",async(req,res)=>{
    try{
     let id=req.params.id;
     let data=await Complaint.find({userId:id});
     res.send(data);
    }catch(err){
     res.status(400).send(err);
    }
});

router.post("/assignComplaint",async(req,res)=>{
    try{
      let body=req.body;
      let body1={...body,technicianId:body.technicianInfo._id,userId:body.userInfo._id,complaintId:body.complaintInfo._id};
      let data=new AssignComplaint(body1);
      await data.save();
      await Complaint.findByIdAndUpdate(body.complaintInfo._id,{status:"ASSIGNED"});
      res.json({status:true,msg:"Technician Assigned"});
    }catch(err){
      res.status(400).send(err);
    }
});

router.get("/getAssinedComplaintByUser/:id",async(req,res)=>{
    try{
     let id=req.params.id;
     let data=await AssignComplaint.find({userId:id});
     res.send(data);
    }catch(err){
     res.status(400).send(err);
    }
});

router.get("/getAssinedComplaintByComplaint/:id",async(req,res)=>{
    try{
     let id=req.params.id;
     let data=await AssignComplaint.find({complaintId:id});
     res.send(data);
    }catch(err){
     res.status(400).send(err);
    }
});

router.get("/getAssinedComplaintByTechnician/:id",async(req,res)=>{
    try{
     let id=req.params.id;
     let data=await AssignComplaint.find({technicianId:id});
     res.send(data);
    }catch(err){
     res.status(400).send(err);
    }
});

router.get("/getAssignedComplaintBy/:id",async(req,res)=>{
    try{
     let _id=req.params.id;
     let data=await AssignComplaint.findById(_id);
     res.send(data);
    }catch(err){
     res.status(400).send(err);
    }
});

router.get("/getAllAssignedComplaint",async(req,res)=>{
    try{
     let data=await AssignComplaint.find({});
     res.send(data);
    }catch(err){
     res.status(400).send(err);
    }
});

module.exports=router;