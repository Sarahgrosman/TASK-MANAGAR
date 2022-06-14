const express = require("express");
const mongoose = require("mongoose");
const taskModel = require('../models/task');
const userModel = require("../models/user");
const router = new express.Router();

//נתיב למציאת כל המשתמשים


router.get("/api/users", async (req, res) => {
    const allUsers = await taskModel.find({});
    console.log(allUsers)
    res.send(allUsers);
    
  });
//נתיב ליצירת משתמש
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
//נתיב לעידכון פרטי משתמש
  router.post("/api/task/:idUser",async (req,res)=>{
    try{
        console.log(req.params)
        const { idUser } = req.params
        console.log(req.body)
        
        await taskModel.findOneAndUpdate({ idUser },req.body);
       
        res.send("succses")
    }
    catch(error){
        res.send(error)
    }
})
//נתיב למחיקת משתמש
router.post("/api/userDelete/:idUser",async (req,res)=>{
    try{
      console.log(req.params)
      const { idUser } = req.params
      const user = await taskModel.find({idUser})
    console.log(user)
    const tasksOfUser = user[0].tasks
    console.log(tasksOfUser);
    tasksOfUser.map(async(el)=>{ 
      const task = await taskModel.find({idTask:el})
      const usersOfTask = task[0].users
      console.log(usersOfTask);
      const newUsersOfTask = usersOfTask.filter((user)=>{
        return user!=idUser
      })
      
      console.log(newUsersOfTask);
     await userModel.findOneAndUpdate({idTask:el},{tasks:newUsersOfTask})
      
 /* const usersOfTask = req.body.users
  //console.log(usersOfTask);
  usersOfTask.map(async(el,i)=>{
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

//נתיב למציאת משתמש והצגת המשימות של המשתמש 
router.get("/api/findUser/:idUser", async(req,res)=>{
  const findUser = await userModel.find({idUser:req.params.idUser})
  console.log(findUser);
  console.log(findUser[0].idUser)
  res.send(findUser[0].tasks)
})








module.exports=router