const express=require("express");
const router=express.Router();
const authcontrol=require("../controller/authControl")

router.get("/login",authcontrol.getlogin)
router.post("/login",authcontrol.postLogin)
router.get("/register",authcontrol.getRegister)
router.post("/register",authcontrol.postregister)
router.get("/dashboard",authcontrol.getDashboard)
router.get('/',authcontrol.getIndex)
router.get('/redirect/:shortId',authcontrol.getRedirect)
router.post("/short",authcontrol.saveRecord)

module.exports=router;


