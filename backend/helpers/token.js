const jwt = require('jsonwebtoken');


const maxAge = 3*24*60*60;
module.exports =  function generateToken(_id){
    return jwt.sign({_id},'mysecret',{expiresIn:maxAge})
}