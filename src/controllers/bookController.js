const bookModel = require('../models/bookModel.js')

const createBook = async function(req,res){
    let data = req.body;
    const saveData = await bookModel.create(data)
    res.send( { msg: saveData})
}

const getBook = async function(req,res){
    let getData = await bookModel.find()
    res.send( { msg : getData})
}

module.exports.createBook = createBook
module.exports.getBook = getBook 