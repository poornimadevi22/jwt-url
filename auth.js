const express=require("express");
const app=express();
const authroute=require("./router/authroute")
const mongoose=require("mongoose");


const Port=8080;


require("dotenv").config(".env");
app.set("view engine", "ejs")
  
app.use(express.urlencoded({ extended: true }));


console.log(process.env.MONGODB)

mongoose
  .connect(`${process.env.MONGODB}/auth-url`,{
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