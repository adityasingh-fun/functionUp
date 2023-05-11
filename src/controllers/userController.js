const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


const createUser = async function(req,res){
  let data = req.body
  let savedData = await userModel.create(data)
  res.send({status:true, msg:savedData})
}


const loginUser = async function(req,res){
  let userId = req.body.emailId
  let password = req.body.password

  let user = await userModel.findOne({emailId:userId,password:password})

  if(!user){
    res.send({status:false,msg:"Incorrect user Id or password"})
  }

  let token = jwt.sign(
    {
      userId:user._id,
      userName:"Addy Bhaiya",
      address:"Ghaziabad",
      profession:"Backend Engineer"
    },
    "My secret key for token generation"
  )
  res.setHeader("x-auth-token",token)
  res.send({status:true,data:token})
}



const getUserData = async function(req,res){
  let userId = req.params.userId
  let user = await userModel.findById(userId)
  if(!user){
    res.send({status:false, msg:"No such user exists"})
  }
  res.send({status:true,msg:user})
}


const updateUser = async function(req,res){
 
  let userId = req.params.userId
  let user = await userModel.findById(userId)
  if(!user){
    res.send({status:false,msg:"No user found"})
  }
  let data = req.body
  let updateUser = await userModel.findOneAndUpdate(
    {_id:userId},
    data,
    {new:true}
  )
  res.send({status:true,msg:updateUser})
}

const deleteUser = async function(req,res){
  let userId = req.params.userId
  let user = await userModel.findById(userId)
  if(!user){
    res.send({status:false,msg:"User not found"})
  }
  let deletedUser = await userModel.findOneAndUpdate(
    {_id:userId},
    {$set:{isDeleted:true}},
    {new:true}
  )
  res.send({status:true,msg:deletedUser})
}

const postMessage = async function (req, res) {
    let message = req.body.message
    let user = await userModel.findById(req.params.userId)
    if(!user) return res.send({status: false, msg: 'No such user exists'})
    
    let updatedPosts = user.posts
    //add the message to user's posts
    updatedPosts.push(message)
    let updatedUser = await userModel.findOneAndUpdate({_id: user._id},{posts: updatedPosts}, {new: true})

    //return the updated user document
    return res.send({status: true, data: updatedUser})
}

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
module.exports.postMessage = postMessage
