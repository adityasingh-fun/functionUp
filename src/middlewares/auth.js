const jwt = require("jsonwebtoken");

const tokenVerify = function(req,res,next){
    
  let token = req.headers['x-auth-token']
  //console.log(token)
  if(!token){
    res.send({msg: "token should be present"})
  }
  let decodedToken = jwt.verify(token,"Aditya's very secret-token made in India")
//   console.log(decodedToken)
  if(!decodedToken){
    res.send({msg: "Invalid Token"})
  }

  next()
}

module.exports.tokenVerify = tokenVerify