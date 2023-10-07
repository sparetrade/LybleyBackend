const express = require("express");
const router = express.Router();
const Registration = require("../models/registration");
const otpGenerator = require('otp-generator');
const { smsSend } = require("../services/service");
const Subscription = require("../models/subscribedPlan");


router.post("/registration", async (req, res) => {
  try {
    let body = req.body;
    let body1 = { name: body.name, contact: body.contact, email: body.email };
    let user = await Registration.findOne({ contact: body.contact });
    if (user) {
      let subBody = { ...body, userId: user?._id };
      let subBody1 = new Subscription(subBody);
      await subBody1.save();
    } else {
      let data = new Registration(body1);
      let data1 = await data.save();
      let subBody = { ...body, userId: data1?._id };
      let subBody1 = new Subscription(subBody);
      await subBody1.save();
    }
    res.json({ status: true, msg: "Plan Subscribed" });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/ghjkl;", async (req, res) => {
  try {
    let body = req.body;
    let user = await Registration.findOne({ contact: body.contact });
    if (user) {
      let otp = otpGenerator.generate(5, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
      await Registration.findByIdAndUpdate({ _id: user._id }, { otp: otp });
      smsSend(otp, body.contact);
      res.json({ status: true, msg: "OTP Sent" });
    } else {
      res.status(404).send({ status: false, msg: "Incorrect Mobile Number" });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/otpPhoneVerification12345", async (req, res) => {
  try {
    let body = req.body;
    let user = await Registration.findOne({ otp: body.otp });
    if (user) {
      res.json({ status: true, user: user, msg: "Logged in successful" });
    } else {
      res.status(404).send({ status: false, msg: "Incorrect OTP" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/getAllUsers", async (req, res) => {
  try {
    let user = await Registration.find({});
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/deleteUser/:id", async (req, res) => {
  try {
    let _id = req.params.id;
    let user = await Registration.findByIdAndDelete(_id);
    if (user) {
      res.json({ status: true, msg: "Deleted" });
    } else {
      res.status(404).send("Not found");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/getUserBy/:id", async (req, res) => {
  try {
    let _id = req.params.id;
    let user = await Registration.findById(_id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send("Not found");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

router.patch("/editUserBy/:id", async (req, res) => {
  try {
    const body = req.body;
    let _id = req.params.id;
    const data = await Registration.findByIdAndUpdate(_id, body);
    res.json({ status: true, msg: "Updated" });
  } catch (err) {
    res.status(500).send(err);
  }
});
module.exports = router;