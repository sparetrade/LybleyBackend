const express=require("express");
const app=express();
require("./src/db/connection");
const cors=require("cors");
const registration=require("./src/routers/registration");
const plan=require("./src/routers/plan");
const servicerRegistratin=require("./src/routers/servicerRegistration");
const subscription=require("./src/routers/subscribedPlan");
const dashboard=require("./src/routers/dashboard");
const complaint=require("./src/routers/complaint");
const blog=require("./src/routers/blog");
const contact=require("./src/routers/contact");

app.use(express.json());
app.use(cors());

app.use(registration);
app.use(plan);
app.use(servicerRegistratin);
app.use(subscription);
app.use(dashboard);
app.use(complaint);
app.use(blog);
app.use(contact);

const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Listing on port ${port}`);
});
