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
         validate(value){
             let Special = ["!","@","#","$","%","^","₪","*"];
             let filter = Special.filter(function(cur){
                 return cur.includes(value)
             });
             if(!filter.length>=2) throw"the password must includes 2 special symbols"
         }  
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