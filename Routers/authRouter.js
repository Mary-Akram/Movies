const express=require("express");
const router=express.Router();
const controller=require("../Controllers/AuthController")
const express_validator=require("express-validator");
const {body, param, query}=require("express-validator");
const authMW=require("./../Middleware/authMiddleware");

router.post("/Register",controller.Register)
router.post("/login",controller.Login)

module.exports=router