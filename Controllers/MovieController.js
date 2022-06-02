const Movie = require("./../Models/MovieModel");
const user = require("./../Models/userModel");

//CREATE

module.exports.AddMovie = async (req, res) => {
  if (!user.IsAdmin) {
    const newMovie = new Movie(req.body);
    try {
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
};

//UPDATE
module.exports.MovieUpdate = async (req, res) => {
  if (!user.IsAdmin) {
    try {
      let updatedMovie = await Movie.updateOne(
        { id: req.params.id },
        {
          $set:{
            Title: req.body.Title,
            Desc: req.body.Desc,
            year: req.body.year,
            limit: req.body.limit,
            isSeries: req.body.isSeries
          }
        }
      );
      res.status(200).json(updatedMovie);
    } 
    catch (err) {
      res.status(500).json(err,"NOOOOOOOOOOOOOOOO");
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
};

 //DELETE

 module.exports.DeleteMovie = async (req, res) => {
  if (!user.IsAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json("The movie has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
};

//GET
module.exports.FindmoviebyID=async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
};

// //GET RANDOM

// router.get("/random", verify, async (req, res) => {
//   const type = req.query.type;
//   let movie;
//   try {
//     if (type === "series") {
//       movie = await Movie.aggregate([
//         { $match: { isSeries: true } },
//         { $sample: { size: 1 } },
//       ]);
//     } else {
//       movie = await Movie.aggregate([
//         { $match: { isSeries: false } },
//         { $sample: { size: 1 } },
//       ]);
//     }
//     res.status(200).json(movie);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// //GET ALL

module.exports.getAllMovies=async (req, res) => {
  if (!user.IsAdmin) {
    try {
      const movies = await Movie.find();
      res.status(200).json(movies.reverse());
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
};
