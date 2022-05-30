const express = require("express");
const mongoose = require("mongoose")
const taskModel = require('../models/task')
const userModel = require("../models/user")
const router = new express.Router();

//נתיב למציאת כל המשימות
router.get("/api/tasks", async (req, res) => {
    const allTasks = await taskModel.find({});
    console.log(allTasks)
    res.send(allTasks);
    
  });
//נתיב ליצירת משימה
  router.post("/api/task", async (req, res) => {
    try {
      console.log(req.body);
      const newTask = new taskModel(req.body);
      await newTask.save();
      console.log(newTask);
     /* try{
      const userOfTask = req.body.users;
      console.log(userOfTask);
      userOfTask.map(async (el) => {
      console.log(el+"ken")
     await userRouter.findOneAndUpdate({id:el},{tasks:[...tasks,req.body.id]})
      console.log("added")
     });
    }
    catch{
      res.send("not added")
    }*/

      }

     catch (error) {
      res.send(error);
    }
  
  });
//נתיב לעידכון פרטי משימה
  router.post("/api/task/:id",async (req,res)=>{
    try{
        console.log(req.params)
        const { id } = req.params
        console.log(req.body)
        
        await taskModel.findOneAndUpdate( id ,req.body);
       
        res.send("succses")
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
    const task = await taskModel.find({id})
    console.log(task)
    const usersOfTask = task[0].users
    console.log(usersOfTask);
    usersOfTask.map(async(el)=>{ 
      const user = await userModel.find({id:el})
      const tasksOfUser = user[0].tasks
      console.log(tasksOfUser);
      const newTasksOfUser = tasksOfUser.filter((task)=>{
        return task!=id
      })
      console.log(newTasksOfUser);
     await userModel.findOneAndUpdate({id:el},{tasks:newTasksOfUser})
    })
    await taskModel.findOneAndDelete({ id });
    }     
    catch{
      res.send("not")
    }
})
//נתיב למציאת משימה והצגת המשתמשים של המשימה 
router.get("/api/findTask/:id", async(req,res)=>{
  const findTask = await taskModel.find({id:req.params.id})
  console.log(findTask);
  console.log(findTask[0].id)
  res.send(findTask[0].users)

}) 



module.exports=router