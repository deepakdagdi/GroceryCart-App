 import jwt from "jsonwebtoken";

const authUser = async(req, res, next) => {
    
      const token = req.cookies.token;
     
    
 
    if(!token){
        return res.json({success : false , message:"Not Authorized token"});

        }
   
    try{
         const tokenDecode= jwt.verify(token, process.env.JWT_SECRET)
          
    if(tokenDecode.id){
    
        req.user =tokenDecode.id;
        
    }
    else{
        return res.json({success : false ,message : "Not decodetoken Authorized"});
    }
        next();
    }catch(error){
        console.log(error.message);
        res.json({success: false , message: error.message});
    }
}

export default authUser;