
const bcrypt=require("bcryptjs")
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema=new Schema({
  username:{
    type:String,
    required:true,
    unique:true,
  },

   password:{
     type: String,
     required:true

   }
})

userSchema.pre("save", async function(next){
      if(this.isModified("password")){
   
         this.password=await bcrypt.hash(this.password, 10)
         }
        next();
      })




module.exports=mongoose.model("User",userSchema)