const mongoose  = require("mongoose");
const shortId=require("shortid");

const urlschema=new mongoose.Schema({
   longUrl:{
    type:String,
    required:true,
   //  default:shortId.generate
   },
   shortUrl:{
    type:String,
    required:true,
    default:shortId.generate()
   },
})


module.exports=mongoose.model("url",urlschema)