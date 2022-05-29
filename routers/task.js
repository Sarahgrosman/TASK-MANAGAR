const express = require("express");
const mongoose = require("mongoose")
const taskModel = require('../models/task')
const userModel = require("../models/user")
const router = new express.Router();

//נתיב למציאת משימה

router.get("/api/tasks",async(req,res)=>{
    try{
        const tasks =await taskModel.find({})
        console.log(tasks);
        res.send(tasks);
    }
    catch(error){
        res.send(error)
    }
});
//נתיב ליצירת משימה
router.post("/api/tasks",async(req,res)=>{
    try{
        console.log(req.body);
        const tasks = new taskModel(req.body);
        await tasks.save()

        res.send(tasks)
        try{
            const userOfTask=req.body.users;
            userOfTask.map(el => {
               await  userModel.findAndUpdate({id:el},{tasks:[...tasks,req.body.id]})
            });

        }
       catch{
        res.send("not added")
       }
    }

    catch(error){
        console.log(error)
    }
});
//נתיב לעדכון לפי id
router.post("api/tasks/:id",async (req,res)=>{
    try{
        console.log(req.params)
        const { id } = req.params
        console.log(req.body)
        
        await taskModel.findOneAndUpdate({ id },req.body);
       
        res.send()
    }
    catch(error){
        res.send(error)
    }
})
//נתיב למחיקת משימה
router.post("/api/taskDelete/:id",async (req,res)=>{
    try{
        console.log(req.params)
        const { id } = req.params
        
        
        await taskModel.findOneAndDelete({ id });
       
        try{
            const userOfTask = req.body.users
            userOfTask.map(async(el)=>{
               await userModel.findAndUpdate({id:el},{tasks:[tasks.filter((el)=>{return el!={ id }})]})   
            })
           
        }

        catch{
            res.send("not soccsesfully")
        }
    }
    catch(error){
        res.send(error)
    }
})
//  להציג משתמשים במשימה
router.get("/api/tasks/:id/",async(req,res)=>{
    const tasks =await taskModel.find({id:req.params.id})
    console.log(tasks);
    res.send(tasks.users);
})


router.post("api/tasks/:idTask/:idUser",async(req,res)=>{
    const user = userModel.find({id:req.params.idUser})
    user.tasks.forEach((el) => {
       el==idTask? res.send(`req.body.tasks${updated}`) : {tasks:[...tasks,req.params.idUser]} 
    })
});
   



module.exports=router