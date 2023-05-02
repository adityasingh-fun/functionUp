const { count } = require("console")
const BookModel= require("../models/bookModel")
const authorModel = require('../models/authorModel')

const createBook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}

const createAuthor = async function(req,res){
    let data = req.body

    let savedData = await authorModel.create(data)
    res.send( { msg:savedData})
}

const getBooksData= async function (req, res) {
    let id = await authorModel.findOne( {authorName : "Chetan Bhagat" } )
    console.log(id)
    let books = await BookModel.find({authorId :id.authorId})
    res.send( { msg : books})
    // if (allBooks.length > 0 )  res.send({msg: allBooks, condition: true})
    // else res.send({msg: "No books found" , condition: false})
}


const updatePrice = async function(req,res){
    let authorInfo = await BookModel.findOneAndUpdate(
        { bookName: "Two states"},
        {$set : {price : 100}},
        {new : true}
    )
    
    console.log(authorInfo);
    let authName = await authorModel.find({authorId : authorInfo.authorId}).select({authorName:1, _id :0});
    console.log(authName);
    res.send( {msg : authorInfo,authName})
}

const getbooksRange= async function (req, res) {
    let authors= await authorModel.find()
    let data=[]
    let books=  await BookModel.find({prices:{$gte:50,$lte:100}}).select({author_id:1,_id:0});
    for(i of books){
        authors= await authorModel.find({author_id:i.author_id}).select({authorName:1, _id:0})   
    }
    data.push(authors)
    console.log(data)
    return res.send(data)
   
}

const updateBooks= async function (req, res) {
    let data = req.body // {sales: "1200"}
    // let allBooks= await BookModel.updateMany( 
    //     { author: "SK"} , //condition
    //     { $set: data } //update in data
    //  )
    let allBooks= await BookModel.findOneAndUpdate( 
        { authorName: "ABC"} , //condition
        { $set: data }, //update in data
        { new: true , upsert: true} ,// new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
     )
     
     res.send( { msg: allBooks})
}

const deleteBooks= async function (req, res) {
    // let data = req.body 
    let allBooks= await BookModel.updateMany( 
        { authorName: "FI"} , //condition
        { $set: {isDeleted: true} }, //update in data
        { new: true } ,
     )
     
     res.send( { msg: allBooks})
}




// CRUD OPERATIONS:
// CREATE
// READ
// UPDATE
// DELETE



module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.updateBooks= updateBooks
module.exports.deleteBooks= deleteBooks
module.exports.createAuthor= createAuthor
module.exports.updatePrice= updatePrice
module.exports.getbooksRange= getbooksRange