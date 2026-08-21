const User = require('../models/User')
const bcrypt = require('bcrypt')
const generateToken = require('../helpers/token')
const cookieParser = require('cookie-parser')
const UserController = {
    login :async (req,res)=>{
        res.json({msg:"login api hit"})
        try{
            const {email,password} = req.body;
            await User.login(email,password);
        }catch(err){
            console.log(err)
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
    }
}

module.exports = UserController;