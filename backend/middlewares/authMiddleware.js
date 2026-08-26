
const jwt = require('jsonwebtoken')

const AuthMiddleware = (req,res,next)=>{

    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,(err,decodeValue)=>{
            if(err){
                return res.status(401).json({message:"unauthenticated"})
           
            }else{
                next();
                console.log("success")
            }
        })
        
    }else{
        return res.status(400).json({message:"need jwt"})
    }
    
}

module.exports = AuthMiddleware;