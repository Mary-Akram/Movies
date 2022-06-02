const jwt=require("jsonwebtoken");


module.exports=(request,response,next)=>{
   let token,decodedToken;

   try
   {
       token=request.get("Authorization").split(" ")[1];
       decodedToken= jwt.verify(token,"WELCOMETOITI");

   }
   catch(error)
   {
       next(new Error("Not Authenticated"))
        
   }
//authenticated
    // request.isAdmin = decodedToken.isAdmin;
    // request.Email = decodedToken.Email;
    // request.password = decodedToken.password;
next();

}