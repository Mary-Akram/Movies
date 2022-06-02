const mongoose=require("mongoose");



 let UserSchema=new mongoose.Schema({
   UserName:{type:String,unique:true,required:true},
    Email:{type:String,unique:true,required:true},
    password:{type:String,required:true},
   ProfilePic:{type:String,default:""},
   IsAdmin:{type:Boolean,default:false},
 },
 {timestamps:true}
 );
module.exports=mongoose.model("user",UserSchema)
