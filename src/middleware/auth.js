const jwt = require("jsonwebtoken");
// const userModel = require("../models/userModel");

const authenticate = function (req, res, next) {
  //check the token in request header
  //validate this token
  try {
    let token = req.headers['x-auth-token']

    if (!token) {
      return res.status(400).send({ status: false, msg: "Toke must be required" })
    }
    let decodedToken = jwt.verify(token, "My secret key for token generation")
    if (!decodedToken) {
      return res.status(401).send({ status: false, msg: "Invalid token" })
    }
    req.user = decodedToken
    next();
  }
  catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
}



const authorise = function (req, res, next) {
  // comapre the logged in user's id and the id in request
  try {
    if (req.params.userId != req.user.userId) {
      return res.status(403).send({ status: false, msg: "User not authorised" })
    }
    next();
  }
  catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
}

module.exports.authenticate = authenticate
module.exports.authorise = authorise