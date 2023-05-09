const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const MW = require('../middlewares/auth.js')

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId",MW.tokenVerify, userController.getUserData)

router.put("/users/:userId",MW.tokenVerify, userController.updateUser)

router.put("/deleteUsers/:userId",MW.tokenVerify, userController.deleteUser)

module.exports = router;