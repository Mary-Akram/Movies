const express=require("express");
const router=express.Router();
const controller=require("../Controllers/UserController")
const express_validator=require("express-validator");
const {body, param, query}=require("express-validator");
const authM=require("./../Middleware/authMiddleware")
router.use(authM)

router.put("/users",controller.updatedUser)
router.get("/find/:id",controller.getById)
router.get("/getAllusers",authM,controller.getAll)
router.delete("/users/:id",authM,controller.DeleteUse)
router.get("/stats",controller.status)
module.exports=router;