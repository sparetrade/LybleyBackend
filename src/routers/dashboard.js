const express=require("express");
const router= express.Router();
const Plan = require("../models/plans");
const Registration=require("../models/registration");
const Servicer=require("../models/servicerRegistratin");
const SubscribedPlan=require("../models/subscribedPlan");
const Complaint=require("../models/complaint");

router.get("/dashboardDetail",async(req,res)=>{
     try{
        let plans= await Plan.countDocuments().exec();
        let users= await Registration.countDocuments().exec();
        let servicer= await Servicer.countDocuments().exec();
        let subscribedPlan= await SubscribedPlan.countDocuments().exec();
        let complaint=await Complaint.countDocuments().exec();
        let complaintData=await Complaint.find({}); 
        res.json({plans:plans,users:users,servicer:servicer,subscribedPlan:subscribedPlan,complaint:complaint,complaintData:complaintData});
     }catch(err){
        res.status(400).send(err);
     }
});
module.exports=router;