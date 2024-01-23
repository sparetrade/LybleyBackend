const express = require("express");
const router = express.Router();
const ContactModel = require("../models/contact");
const { upload, careerOrContactMail } = require("../services/service");

router.post("/createCareer", upload().single("image"), async (req, res) => {
    try {
        let image = req.file.location;
        let body = { ...req.body, resume: image };
        let data = await ContactModel.create(body);
        res.status(201).json({ status: true, msg: "Message sent" })
        // careerOrContactMail(body.name, body.contact, body.email, body.message)
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post("/createContact", async (req, res) => {
    try {
        let body = req.body;
        let data = await ContactModel.create(body);
        res.status(201).json({ status: true, msg: "Message sent" })
       // careerOrContactMail(body.name, body.contact, body.email, body.message)
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get("/getContactDetails", async (req, res) => {
    try {
        let body = req.body;
        let data = await ContactModel.find({});
        res.send(data);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;