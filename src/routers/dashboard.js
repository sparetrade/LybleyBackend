const express=require("express");
const router= express.Router();
const Plan = require("../models/plans");
const Registration=require("../models/registration");
const Servicer=require("../models/servicerRegistratin");
const SubscribedPlan=require("../models/subscribedPlan");
const Complaint=require("../models/complaint");
const SubcriptionVerification=require("../models/subscribeVerification");

router.get("/dashboardDetail",async(req,res)=>{
     try{
        let plans= await Plan.countDocuments().exec();
        let users= await Registration.countDocuments().exec();
        let servicer= await Servicer.countDocuments().exec();
        let subscribedPlan= await SubscribedPlan.countDocuments().exec();
        let complaint=await Complaint.countDocuments().exec();
      //   let verificationData=await SubcriptionVerification.countDocuments().exec();
        let unVerificationData = await SubcriptionVerification.countDocuments({ status: "ASSIGNED" }).exec();
        let verificationData = await SubcriptionVerification.countDocuments({ status: "VERIFIED" }).exec();
        let complaintData=await Complaint.find({}); 
        res.json({unVerificationData:unVerificationData,verificationData:verificationData,plans:plans,users:users,servicer:servicer,subscribedPlan:subscribedPlan,complaint:complaint,complaintData:complaintData});
     }catch(err){
        res.status(400).send(err);
     }
});
module.exports=router;