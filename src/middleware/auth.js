const jwt = require("jsonwebtoken");
// const userModel = require("../models/userModel");

const authenticate = function(req, res, next) {
    //check the token in request header
    //validate this token
    let token = req.headers['x-auth-token']

  if(!token){
   return res.send({status:false,msg:"Toke must be required"})
  }
  let decodedToken = jwt.verify(token,"My secret key for token generation")
  if(!decodedToken){
   return res.send({status:false,msg:"Invalid token"})
  }
  req.user = decodedToken
    next()
  }



const authorise = function(req, res, next) {
    // comapre the logged in user's id and the id in request
    if(req.params.userId != req.user.userId){
        return res.send({status:false,msg:"User not authorised"})
      }
    next()
}

module.exports.authenticate = authenticate
module.exports.authorise = authorise