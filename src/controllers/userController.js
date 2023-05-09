const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


/*
  Read all the comments multiple times to understand why we are doing what we are doing in login api and getUserData api
*/
const createUser = async function (abcd, xyz) {
  //You can name the req, res objects anything.
  //but the first parameter is always the request 
  //the second parameter is always the response
  let data = abcd.body;
  let savedData = await userModel.create(data);
  xyz.send({ msg: savedData });
};



// const loginUser = async function (req, res) {
//   let userName = req.body.emailId;
//   let password = req.body.password;

//   let user = await userModel.findOne({ emailId: userName, password: password });
//   console.log(user)
//   if (!user)
//     return res.send({
//       status: false,
//       msg: "username or the password is not corerct",
//     });

  // Once the login is successful, create the jwt token with sign function
  // Sign function has 2 inputs:
  // Input 1 is the payload or the object containing data to be set in token
  // The decision about what data to put in token depends on the business requirement
  // Input 2 is the secret (This is basically a fixed value only set at the server. This value should be hard to guess)
  // The same secret will be used to decode tokens 
  // let token = jwt.sign(
  //   {
  //     userId: user._id.toString(),
  //     batch: "thorium",
  //     organisation: "FunctionUp",
  //   },
  //   "functionup-plutonium-very-very-secret-key"
  // );
  // res.setHeader("x-auth-token", token);
  // res.send({ status: true, token: token });
// };

const loginUser = async function(req,res){
  let userId = req.body.emailId
  let password = req.body.password

  let user = await userModel.findOne( {emailId: userId, password:password})
  // console.log(user)
  if(!user){
    res.send({status : false, msg:"Incorrect userId or password"})
  }

  let token = jwt.sign(
    {
      userId: user._id.toString(),
      userName: "Addy Bhaiya",
      address: "Ghaziabad",
      student: "functionUp"
    },
    "Aditya's very secret-token made in India"
  )
  res.setHeader("x-auth-token",token)
  res.send({status:true,token:token})

}

// const getUserData = async function (req, res) {
//   let token = req.headers["x-Auth-token"];
//   if (!token) token = req.headers["x-auth-token"];

//   //If no token is present in the request header return error. This means the user is not logged in.
//   if (!token) return res.send({ status: false, msg: "token must be present" });

//   console.log(token);

//   // If a token is present then decode the token with verify function
//   // verify takes two inputs:
//   // Input 1 is the token to be decoded
//   // Input 2 is the same secret with which the token was generated
//   // Check the value of the decoded token yourself

//   // Decoding requires the secret again. 
//   // A token can only be decoded successfully if the same secret was used to create(sign) that token.
//   // And because this token is only known to the server, it can be assumed that if a token is decoded at server then this token must have been issued by the same server in past.
//   let decodedToken = jwt.verify(token, "functionup-plutonium-very-very-secret-key");
//   if (!decodedToken)
//     return res.send({ status: false, msg: "token is invalid" });

//   let userId = req.params.userId;
//   let userDetails = await userModel.findById(userId);
//   if (!userDetails)
//     return res.send({ status: false, msg: "No such user exists" });

//   res.send({ status: true, data: userDetails });
//   // Note: Try to see what happens if we change the secret while decoding the token
// };


const getUserData = async function(req,res){
  // let token = req.headers['x-auth-token']

  // console.log(token)
  // if(!token){
  //   res.send({msg: "token should be present"})
  // }
  // let decodedToken = jwt.verify(token,"Aditya's very secret-token made in India")
  // console.log(decodedToken)
  // if(!decodedToken){
  //   res.send({msg: "Invalid Token"})
  // }
  let userId = req.params.userId
  let userData = await userModel.findById(userId)

  if(!userData){
    res.send({msg:"No such user exists"})
  }
  res.send({status:true, msg:userData})


}


// const updateUser = async function (req, res) {
//   // Do the same steps here:
//   // Check if the token is present
//   // Check if the token present is a valid token
//   // Return a different error message in both these cases

//   let userId = req.params.userId;
//   let user = await userModel.findById(userId);
//   //Return an error if no user with the given id exists in the db
//   if (!user) {
//     return res.send("No such user exists");
//   }

//   let userData = req.body;
//   let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
//   res.send({ status: updatedUser, data: updatedUser });
// };



const updateUser = async function(req,res){
  // let token = req.headers['x-auth-token']
  // console.log(token)

  // if(!token){
  //   res.send({status: false, msg: "Token is required"})
  // }
  // let decodedToken = jwt.verify(token,"Aditya's very secret-token made in India")
  // // console.log(decodedToken)

  // if(!decodedToken){
  //   res.send({status:false, msg:"Invalid token"})
  // }

  let data = req.body
  // console.log(data)
  let userId = req.params.userId
  // console.log(userId)
  let user = userModel.findById(userId)
  if(!user){
    res.send({status:false, msg:"No such user exists"})
  }

  let updatedData = await userModel.findOneAndUpdate(
    {_id : userId},
    data,
    {new:true}
  )
  // console.log(updatedData)

  res.send({status: true, msg:updatedData})
}


const deleteUser = async function(req,res){
  // let token =  req.headers['x-auth-token']
  // if(!token){
  //   res.send({status: false, msg: "Token does not exist"})
  // }

  // let decodedToken = jwt.verify(token,"Aditya's very secret-token made in India")
  // if(!decodedToken){
  //   res.send({status:false, msg:"Invalid token"})
  // }

  let userId = req.params.userId
  let deletedUser = await userModel.findOneAndUpdate(
    {_id: userId},
    {$set:{isDeleted:true}}
  )
  res.send({status:true,msg:deletedUser})

}

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;