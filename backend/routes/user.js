const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController')
const {body} = require('express-validator')
const handleMessage = require('../middlewares/handleMessage');
const User = require('../models/User');

router.post('/login',UserController.login);

router.post('/register',[
    body('name').notEmpty(),
    body('email').notEmpty(),
    body('email').custom(async value=>{
        const user = await User.findOne({email:value});
        if(user){
            throw new Error('User already in')
        }
    }),
    body('password').notEmpty()
],handleMessage,UserController.register)



module.exports = router;