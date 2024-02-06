
const express=require("express");
const router= express.Router();
const Verification=require("../models/subscribeVerification");
const VerificationDetails=require("../models/verificationDetail");
const Subscription=require("../models/subscribedPlan");
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

 
router.post("/addVerificationDetails", upload().array("images"), async (req, res) => {
  try {
    let body = req.body;
    let files = req.files;
    let images = files?.map(f1 => f1.location);

    let newVerificationDetails = {
      images: images,
      description: body.description,
      appliancesName: body.appliancesName,
    };

    // Assuming you have userId and subscriptionId in the request body
    let userId = body.userId;
    let technicianId = body.technicianId;
    let planId = body.planId;
    let subscriptionId = body.subscriptionId;

    // Find the document based on userId and subscriptionId
    let existingDoc = await VerificationDetails.findOne({ userId: userId, subscriptionId: subscriptionId });

    if (existingDoc) {
      // Update the array in the existing document
      existingDoc.verificationDetails.push(newVerificationDetails);
      await existingDoc.save();
    } else {
      // Create a new document if it doesn't exist
      let obj = new VerificationDetails({
        userId: userId,
        technicianId:technicianId,
        subscriptionId: subscriptionId,
        planId: planId,
        verificationDetails: [newVerificationDetails]
      });
      await obj.save();
    }

    res.json({ status: true, msg: "Details added successfully" });
  } catch (err) {
    res.status(400).send(err);
  }
});


 

router.post("/updateVerificationDetails", async (req, res) => {
  try {
    let body = req.body;
    

    // Assuming userId is unique, use findOneAndUpdate
    const updatedSubscription = await Subscription.findOneAndUpdate(
      { userId: body.userId }, // Find the document by userId
      { status: "APPROVED" }, // Update the status field
      { new: true } // To return the updated document
    );

    if (updatedSubscription) {
      res.json({ status: true, msg: "Updated successfully", updatedSubscription });
    } else {
      res.status(404).json({ status: false, msg: "Subscription not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
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
   let id=req.params.id;
   let data=await VerificationDetails.find({userId:id});
   res.send(data);
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