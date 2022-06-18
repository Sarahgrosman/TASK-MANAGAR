const mongoose = require("mongoose") 

const taskSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    idTask:{
        type:Number,
        required:true
    },
    users:{
     type:[number],
     default:[]
    }

});

module.exports=mongoose.model("task",taskSchema)