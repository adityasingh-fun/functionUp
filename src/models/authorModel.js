const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {
    authorName: String, 
    authorId: {
        type : Number,
        Unique : true,
        Require : true
    }, 
    age : Number,
    address : String
    
    

}, { timestamps: true });


module.exports = mongoose.model('Author', authorSchema) //users
