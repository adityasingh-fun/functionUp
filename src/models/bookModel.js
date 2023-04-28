const { default: mongoose } = require("mongoose");


// Create a bookSchema with bookName, authorName, category and year . Create same 2 api's for books i.e. : 1 api to create a new book and another api to get the list of all books. 

const bookSchema = new mongoose.Schema({
    bookName : {
        type: String,
        require: true
    },
    price: {
        indianPrice: String,
        europeanPrice: String
    },
    tags : [String],
    authorName : String,
    totalPages: Number,
    stockAvailable: Boolean,
    year : {
        type: Number,
        default: 2021
    }
},{timestamp : true})


module.exports = mongoose.model("Book2",bookSchema)