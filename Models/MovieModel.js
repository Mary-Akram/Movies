const mongoose=require("mongoose");



 let MovieSchema=new mongoose.Schema({
   Title:{type:String,unique:true,required:true},
    Desc:{type:String},
    imgTitle: { type: String },
    imgSm: { type: String },
    trailer: { type: String },
    video: { type: String },
    year: { type: String },
    limit: { type: Number },
    genre: { type: String },
    isSeries: { type: Boolean, default: false },
 },
 {timestamps:true}
 );
module.exports=mongoose.model("Movie",MovieSchema)
