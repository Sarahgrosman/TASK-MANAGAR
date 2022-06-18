const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    idUser: {
        type:Number
    },
    
    email:{
        unique:true,
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        minlength:7,
        validate(value) {
            if (!value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
              throw "email is error";
          },
    },
        password:{
            type:String,
            required:true,
            trim:true,
            minlength:7,
            validate(value) {
                if (!value.match(/^(?=.*[0-9])(?=.*[!@#$%^&*]){2}/))
                  throw "invalid password";
              },
             
        },
        age:{
            type:Number,
            default:0,
            required:true

        },
        tasks:{
            type:[],
            default:[],
        }


})

module.exports=mongoose.model("user",userSchema)