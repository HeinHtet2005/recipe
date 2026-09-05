const User = require('../models/User')
const generateToken = require('../helpers/token')
const UserController = {
    login :async (req,res)=>{
        try{
            const {email,password} = req.body;
            const user = await User.login(email,password);
            const token = generateToken(user._id);
            res.cookie('jwt',token,
                {
                    httpOnly:true,
                    maxAge: 3 * 24 * 60 * 60 * 1000
                }
            );
            return res.status(201).json({
                msg:"user login successfulyy",
                data:user,
                token
            })
            
        }catch(error){
            return res.status(400).json({error:error.message})
        }
    },
    register :async(req,res)=>{
        try{
            const {name,email,password} = req.body;
            const user = await User.register(name,email,password);
            const token = generateToken(user._id);
            res.cookie('jwt',token,
                {
                    httpOnly:true,
                    maxAge: 3 * 24 * 60 * 60 * 1000
                }
            );
            return res.status(201).json({
                msg:"user created successfulyy",
                data:user,
                token
            })
        }catch(error){
            return res.status(400).json({error:error.message})
        }
    },
    logout : (req,res)=>{
        res.cookie('jwt','', {  maxAge : 1 });
        return res.json({message : "user logged out"});
    }
}

module.exports = UserController;