const express = require("express");
const router = new express.Router();
const Blog = require("../models/blog");
const { upload } = require("../services/service");

// router.post("/createBlog", async (req, res) => {
//     try {
//         let body=req.body
//         console.log(body);
//         // let image = req.file.location;
//         // let data = new Blog({ ...body, image: image  });
//         // let data1 = await data.save();
//         res.json({ status: true, msg: "Blog Created" });
//     } catch (err) {
//         res.status(400).send(err);
//     }
// });

router.post("/createBlog",upload().single("image"), async (req, res) => {
    try {
        if (!req.file || !req.body) {
            return res.status(400).json({ status: false, msg: "Invalid request format" });
        }
        let image = req.file.location;
        let data = new Blog({ ...req.body, image: image });
        let data1 = await data.save();
        res.json({ status: true, msg: "Blog Created" });
    } catch (err) {
        res.status(400).send(err.message || err);
    }
});

router.patch("/updateBlogImage/:id",upload().single("image"), async (req, res) => {
    try {
        let _id=req.params.id;
        let image1 = req.file.location;
        let data = await Blog.findById(_id);
           data.image = image1;
           await data.save();
        res.json({status:true,msg:"Updated"});
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get("/getAllBlogs", async (req, res) => {
    try {
        let data = await Blog.find({});
        res.send(data);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get("/getBlogById/:id", async (req, res) => {
    try {
        let _id=req.params.id;
        let data = await Blog.findById(_id);
        res.send(data);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete("/deleteBlog/:id", async (req, res) => {
    try {
        let _id = req.params.id;
        let data = await Blog.findByIdAndDelete(_id);
        res.json({ status: true, msg: "Deleted" });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.patch("/updateBlog/:id", async (req, res) => {
    try {
        let _id = req.params.id;
        let body = req.body;
        let data = await Blog.findByIdAndUpdate(_id, body);
        res.json({ status: true, msg: "Updated" });
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports=router;