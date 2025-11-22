import jwt from "jsonwebtoken";

const authUser = async(req, res, next) => {
    
      const token = req.cookies?.token;
    
 
    if(!token){
         return res.status(401).json({ success: false, message: "Not Authorized (Cookie)" });

        }
   
    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    req.user = decoded.id;
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(401).json({ success: false, message: "Token verification failed" });
  }
}

export default authUser;