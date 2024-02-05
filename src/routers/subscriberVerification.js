
const express=require("express");
const router= express.Router();
const Verification=require("../models/subscribeVerification");
const VerificationDetails=require("../models/verificationDetail");
const {upload}=require("../services/service");


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


// technician verification details

 
router.post("/verificationDetails",upload().array("images"), async (req, res) => {
  try {
      let body = req.body;
      let files = req.files;
      let images = files?.map(f1 => f1.location);
      // let obj = new VerificationDetails({ ...body, images: images });
      // let data = await obj.save();
      let newVerificationDetails = {
        images: images,
        description: body.description,
        appliancesName: body.appliancesName,
      };
  
      let existingDoc = await VerificationDetails.findOne({});
      if (existingDoc) {
        existingDoc.verificationDetails.push(newVerificationDetails);
        let obj = new VerificationDetails({...body, verificationDetails: [newVerificationDetails] });
        await obj.save();
      } else {
        let obj = new VerificationDetails({...body, verificationDetails: [newVerificationDetails] });
        await obj.save();
      }
      res.json({ status: true, msg: "Details added successfully" });
  } catch (err) {
      res.status(400).send(err);
  }
});

router.get("/getAllVerificationDetails",async(req,res)=>{
  try{
   let data=await VerificationDetails.find({});
   res.send(data);
  }catch(err){
   res.status(400).send(err);
  }
});

router.get("/getVerificationDetailsBy/:id",async(req,res)=>{
  try{
   let _id=req.params.id;
   let subscription=await VerificationDetails.findById(_id);
   res.send(subscription);
  }catch(err){
   res.status(400).send(err);
  }
});

router.get("/getVerificationDetailsTechId/:id",async(req,res)=>{
try{
let id=req.params.id;
let subscription=await VerificationDetails.find({technicianId:id});
res.send(subscription);
}catch(err){
res.status(400).send(err);
}
});
module.exports=router;