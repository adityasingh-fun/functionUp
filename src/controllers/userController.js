const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


const createUser = async function (req, res) {
  try {
    let data = req.body
    let savedData = await userModel.create(data)
    res.status(201).send({ status: true, msg: savedData })
  }
  catch (error) {
    res.status(400).send({ status: false, msg: error.message });
  }
};


const loginUser = async function (req, res) {
  try {
    let userId = req.body.emailId
    let password = req.body.password

    let user = await userModel.findOne({ emailId: userId, password: password })

    if (!user) {
      return res.status(400).send({ status: false, msg: "Incorrect user Id or password" })
    }

    let token = jwt.sign(
      {
        userId: user._id,
        userName: "Addy Bhaiya",
        address: "Ghaziabad",
        profession: "Backend Engineer"
      },
      "My secret key for token generation"
    )
    res.setHeader("x-auth-token", token)
    res.status(201).send({ status: true, data: token })
  }
  catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
}



const getUserData = async function (req, res) {
  try {
    let userId = req.params.userId
    let user = await userModel.findById(userId)
    if (!user) {
      return res.status(404).send({ status: false, msg: "No such user exists" })
    }
    res.status(200).send({ status: true, msg: user })
  }
  catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
}


const updateUser = async function (req, res) {

  try {
    let userId = req.params.userId
    let user = await userModel.findById(userId)
    if (!user) {
      return res.status(404).send({ status: false, msg: "No user found" })
    }
    let data = req.body
    let updateUser = await userModel.findOneAndUpdate(
      { _id: userId },
      data,
      { new: true }
    )
    res.status(200).send({ status: true, msg: updateUser })
  }
  catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
}

const deleteUser = async function (req, res) {
  try {
    let userId = req.params.userId
    let user = await userModel.findById(userId)
    if (!user) {
      return res.status(404).send({ status: false, msg: "User not found" })
    }
    let deletedUser = await userModel.findOneAndUpdate(
      { _id: userId },
      { $set: { isDeleted: true } },
      { new: true }
    )
    res.status(200).send({ status: true, msg: deletedUser })
  }
  catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
}

const postMessage = async function (req, res) {
  try {
    let message = req.body.message
    let user = await userModel.findById(req.params.userId)
    if (!user) return res.status(404).send({ status: false, msg: 'No such user exists' })

    let updatedPosts = user.posts
    //add the message to user's posts
    updatedPosts.push(message)
    let updatedUser = await userModel.findOneAndUpdate({ _id: user._id }, { posts: updatedPosts }, { new: true })

    //return the updated user document
    return res.status(200).send({ status: true, data: updatedUser })
  }
  catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
}

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser;
module.exports.postMessage = postMessage
