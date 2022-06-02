const router = require("express").Router();
const authM=require("./../Middleware/authMiddleware")
const controller=require("./../Controllers/ListController");

router.post("/createList",controller.CreateNewList)
router.delete("/deletelist/:id",controller.DeleteMovieList)

module.exports=router;

