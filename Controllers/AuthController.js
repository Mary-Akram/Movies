const {validationResult}=require("express-validator");
const { model } = require("mongoose");
const User=require("../Models/userModel");
const bcrypt =require("bcrypt")
const jwt=require("jsonwebtoken")
//REGISTER

module.exports.Register= async (req, res) => {
    const salt = await bcrypt.genSalt(10);

    const newUser = new User({
      UserName: req.body.UserName,
      Email: req.body.Email,
      password:await bcrypt.hash(req.body.password, salt),
      IsAdmin:req.body.IsAdmin
    });
    try {
      const user = await newUser.save();
      res.status(201).json({message:"User created",user});
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  //Login
  module.exports.Login=async(req,res)=>{
      let token
  
        const body = req.body;
        const user = await User.findOne({ Email: body.Email });
        if (user) {
          // check user password with hashed password stored in the database
          const validPassword = await bcrypt.compare(body.password, user.password);
          if (validPassword) {

            token = jwt.sign({
                Email:user.Email,
                IsAdmin:user.IsAdmin
            },"WELCOMETOITI",{expiresIn:"24h"});
            res.status(200).json({ message: "Valid password",user,token });

          } else {
            res.status(400).json({ error: "Invalid Password" });
          }
        } else {
          res.status(401).json({ error: "User does not exist" });
        }
      }
  