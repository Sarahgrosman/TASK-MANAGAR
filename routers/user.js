const express = require("express");
const mongoose = require("mongoose");
const TaskModel = require('../models/task');
const userModel = require("../models/user");
const router = new express.Router();

router.get("./api/users",async(req,res)=>{
    try{
        const users =await userModel.find({})
        console.log(users);
        res.send(users);
    }
    catch(error){
        res.send(error)
    }
})
router.post("/api/users",async(req,res)=>{
    try{
        console.log(req.body);
        const users = new userModel(req.body);
        await users.save()

        res.send(users)
    }
    catch(error){
        console.log(error)
    }

});
router.post("/api/user/:id",async (req,res)=>{
    try{
        console.log(req.params)
        const { id } = req.params
        console.log(req.body)
        
        await userModel.findOneAndUpdate({ id },req.body);
       
        res.send(user)
    }
    catch(error){
        res.send(error)
    }
})
router.post("/api/userdelete/:name",async (req,res)=>{
    try{
        
        const { name } = req.params
        
        
        await userModel.findOneAndDelete({ name });
       
        res.send(user)
    }
    catch(error){
        res.send(error)
    }
})






module.exports=router