const express = require("express");
const body_parser=require("body-parser");
const mongoose= require("mongoose");
const cors=require("cors");
const dotenv=require("dotenv")
const authRouter=require("./Routers/authRouter")
const userRouter=require("./Routers/UserRouter");
const MovieRouter=require("./Routers/MovieRouter");
const ListRouter=require("./Routers/ListRouter");

const server=express();
dotenv.config();


mongoose.connect(process.env.MONGO_URL)
        .then(()=>{
            console.log("DB connectd");
            server.listen(process.env.PORT||8080,()=>{
                console.log("I am Listening .. ")
            });
        })
        .catch(error=>console.log("DB we cannot connect"))



//Logger MW
server.use((request,response,next)=>{
    console.log(request.url,request.method);
    next();
});
server.use(cors());
//Body Parser
server.use(body_parser.json());
server.use(body_parser.urlencoded({extended:false}));

//Routers
server.use(authRouter)
server.use(userRouter)
server.use(MovieRouter)
server.use(ListRouter)
//Not Found MW
server.use((request,response)=>{
    response.status(404).json({meassge:"Page is Not Found"});
 });

//Error
//something went wrong when deployment
server.use((error,request,response,next)=>{
    response.status(500).json({meassge:error+""});
});
