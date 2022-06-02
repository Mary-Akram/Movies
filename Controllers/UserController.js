const bcrypt = require("bcrypt");
const user=require("./../Models/userModel")
//UPDATE

module.exports.updatedUser=async(req,res)=>{
    const body=req.body;
    const salt = await bcrypt.genSalt(10);
    
    try {
      console.log("Hello");
let updateduser = await User.updateOne({_id:req.body._id},{
$set:{
    UserName: req.body.UserName,
      Email: req.body.Email,
      password:await bcrypt.hash(req.body.password, salt),
      ProfilePic:req.body.ProfilePic,    
}

      })
   
      res.status(200).json(updateduser);
    } 
    catch (err) {
      res.status(500).json(err,"NOOOOOOOOOOOOOOOO");
    }
}
  



//DELETE
module.exports.DeleteUse=async (req, res) => {
  if (User.IsAdmin||User._id===req.params._id){
    try {
      await User.findByIdAndDelete(req.params._id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can delete only your account!");
    }
}


//GET

module.exports.getById=async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
};

//GET ALL
module.exports.getAll=async (req, res) => {
  const query = req.query.new;
  if (!req.body.IsAdmin)
   {
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)//if there are new user give mw the new users sort-1 sort in reverse
        : await User.find();//if no new in url just give me all users
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to see all users!");
  }
}

//GET USER STATS
module.exports.status=async (req, res) => {
  const today = new Date();
  const latYear = today.setFullYear(today.setFullYear() - 1);

  try {
    const data = await User.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
};

