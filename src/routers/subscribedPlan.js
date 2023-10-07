const express=require("express");
const router= express.Router();
const Subscription=require("../models/subscribedPlan");

router.get("/getAllSubscription",async(req,res)=>{
    try{
        let subscription=await Subscription.find({});
        res.send(subscription);
    }catch(err){
        res.status(400).send(err);
    }
});

router.get("/getSubscriptionBy/:id",async(req,res)=>{
       try{
        let _id=req.params.id;
        let subscription=await Subscription.findById(_id);
        res.send(subscription);
       }catch(err){
        res.status(400).send(err);
       }
});

router.get("/getSubscriptionByUserId/:id",async(req,res)=>{
    try{
     let id=req.params.id;
     let subscription=await Subscription.find({userId:id});
     res.send(subscription);
    }catch(err){
     res.status(400).send(err);
    }
});

module.exports=router;