const express = require('express');
const router = express.Router();
const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController");
const bookModel = require('../models/bookModel.js');
const bookController = require('../controllers/bookController.js')

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUser", UserController.createUser  )

router.get("/getUsersData", UserController.getUsersData)

router.post('/createBook', bookController.createBook)

router.get('/listOfBooks', bookController.getBook)
module.exports = router;