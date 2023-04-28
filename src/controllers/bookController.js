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

const getBookList = async function(req,res){
    let data = await bookModel.find().select({bookName: 1,authorName: 1,_id: 0})
    res.send({msg: data})
}

const bookPublished = async function(req,res){
    let year_send = req.body.year
    let data = await bookModel.find({year:year_send})
    res.send({msg : data})
}

const searchForBooks =async function(req,res){
    let condition=req.body;
    let availableData=await bookModel.find();
    let yourResponse=[]
    for(let i=0;i<availableData.length;i++){
        if(condition.bookName==availableData[i].bookName||condition.authorName==availableData[i].authorName||condition.year==availableData[i].year){
            yourResponse.push(availableData[i])
        }
    }
    res.send(yourResponse)
}

const searchByPrice= async function(req,res){
    let yourData= await bookModel.find();
    let arr=[];
    for(let i=0;i<yourData.length;i++){
        if(yourData[i].price.indianPrice=="Rs100"||yourData[i].price.indianPrice=="Rs200"||yourData[i].price.indianPrice=="Rs500"){
                 arr.push(yourData[i]);
        }
    }
    res.send(arr);
}

const getRandomBooks = async function(req,res){
    const data = await bookModel.find({
        $or : [ {stockAvailable:true},{totalPages : {$gt : 500}}]
    })
    res.send({msg: data})
}

module.exports.createBook = createBook
module.exports.getBook = getBook 
module.exports.getBookList = getBookList
module.exports.bookPublished = bookPublished
module.exports.searchForBooks = searchForBooks
module.exports.searchByPrice = searchByPrice
module.exports.getRandomBooks = getRandomBooks