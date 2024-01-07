const express=require("express");
const app=express();
const authroute=require("./router/authroute")
const mongoose=require("mongoose");


const Port=8000;


require("dotenv").config();
app.set("view engine", "ejs")
  
app.use(express.urlencoded({ extended: true }));




mongoose
  .connect('mongodb://localhost:27017/auth-url',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
   console.log("connected to Mongodb...")
}).catch((err)=>{
  console.log("could not connect to Mongodb...", err)
})

app.use(authroute);
app.use((req, res, next) => {
  console.log('Hello');
  next();
});

app.listen(process.env.PORT || Port, ()=>{
    console.log(`server running on port`,process.env.PORT)
})