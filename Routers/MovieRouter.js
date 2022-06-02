const router = require("express").Router();
const authM=require("./../Middleware/authMiddleware")
const controller=require("./../Controllers/MovieController");

router.use(authM);

router.route("/Movie")
.post(controller.AddMovie)
router.delete("/Movie/:id",controller.DeleteMovie)

router.put("/updateMovie/:id",controller.MovieUpdate)
router.get("/findMovie/:id",controller.FindmoviebyID)
router.get("/AllMovies",controller.getAllMovies)


module.exports=router;
