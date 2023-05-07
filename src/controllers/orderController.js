const { type } = require("express/lib/response")
const orderModel= require("../models/orderModel")
const productModel= require("../models/ProductModel")
const userModel= require("../models/userModel")


const createOrder= async function(req,res){
    const data= req.body
    const uid=req.body.userId
    const pid=req.body.productId
    const alluser=await userModel.find()
    const allproduct= await productModel.find()
    let order=null
    for(let i of alluser){
       for(let j of allproduct){
        if(uid==i._id&&pid==j._id){
            if(i.isFreeAppUser==false&&i.balance>data.amount){
            order= await orderModel.create(data)
            user=await userModel.updateMany({_id:uid},{$inc:{balance:-data.amount}},{$new:true})
           return  res.send(order)
            }
            else if(i.isFreeAppUser==false&&i.balance<data.amount){
                return res.send("you don't have enough balance")
            }
            else{
            order= await orderModel.create(data)
            product=await orderModel.updateMany({_id:uid},{$set:{amount:0}},{$new:true})
            return res.send(order)
            }
           }
       }
    }

    
    res.send("First register to place order")
}




module.exports.createOrder = createOrder