const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const ProductController= require("../controllers/ProductController")
const OrderController= require("../controllers/orderController")
const commonMW = require ("../middlewares/commonMiddlewares")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUser", commonMW.midWarUser, UserController.createUser )
router.post("/createProduct", ProductController.createProduct )
router.post("/createOrder",commonMW.midWarUser,  OrderController.createOrder )
router.post("/basicRoute", commonMW.mid1, commonMW.mid2, commonMW.mid3, commonMW.abc, UserController.basicCode, commonMW.mid4)

module.exports = router;