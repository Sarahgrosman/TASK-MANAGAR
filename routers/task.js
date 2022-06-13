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
     
      const userOfTask = req.body.users;
      console.log(userOfTask);
      userOfTask.map(async (el) => {
      
     const user=await userModel.findOne({idUser:el})
      console.log(user)
      const tasksUser = user.tasks
      console.log(tasksUser);
      await user.updateOne({tasks:tasksUser.push(req.body.idTask)})
      console.log(tasksUser);
      await userModel.findOneAndUpdate({idUser:el},{tasks:tasksUser})
     });
    
    res.send("ok")

      }

     catch (error) {
      res.send(error);
    }
  
  });
//נתיב לעידכון פרטי משימה
  router.post("/api/task/:idTask",async (req,res)=>{
    try{
        console.log(req.params)
        const { idTask } = req.params
        console.log(req.body)
        
        await taskModel.findOneAndUpdate({ idTask },req.body);
       
        res.send("succses")
    }
    catch(error){
        res.send(error)
    }
})
//נתיב למחיקת משימה
router.post("/api/taskDelete/:idTask",async (req,res)=>{
    try{
      console.log(req.params)
      const { idTask } = req.params
      const task = await taskModel.find({idTask})
    console.log(task)
    const usersOfTask = task[0].users
    console.log(usersOfTask);
    usersOfTask.map(async(el)=>{ 
      const user = await userModel.find({idUser:el})
      const tasksOfUser = user[0].tasks
      console.log(tasksOfUser);
      const newTasksOfUser = tasksOfUser.filter((task)=>{
        return task!=idTask
      })
      
      console.log(newTasksOfUser);
     await userModel.findOneAndUpdate({idUser:el},{tasks:newTasksOfUser})
      
 /* const userOfTask = req.body.users
  //console.log(userOfTask);
  userOfTask.map(async(el,i)=>{
    const user = await userModel.find({idUser:el})
  
    await user[0].updateOne({tasks:user[0].tasks.filter((el)=>{return el!= idTask })})   
    console.log(user);
    
    })
   await taskModel.findOneAndDelete({ idTask });*/
   res.send("deleted")
    })
  }    
    catch{
      res.send("not")
    }

  })

//נתיב למציאת משימה והצגת המשתמשים של המשימה 
router.get("/api/findTask/:idTask", async(req,res)=>{
  const findTask = await taskModel.find({idTask:req.params.idTask})
  console.log(findTask);
  console.log(findTask[0].idTask)
  res.send(findTask[0].users)
})

router.post("/api/updateTask/:idUser/:idTask",async(req,res)=>{
  const {idUser} = req.params
  const {idTask} = req.params
  const user = await userModel.find ({idUser})
  console.log(user);
  user[0].tasks.includes(idTask)? res.send("Already exists") :

   await userModel.findOneAndUpdate({idUser},{tasks:[...user[0].tasks,idTask]})
   res.send("updated")
  })

module.exports=router