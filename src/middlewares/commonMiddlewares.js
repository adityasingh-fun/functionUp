
const mid1= function ( req, res, next) {
    req.falana= "hi there. i am adding something new to the req object"
    console.log("Hi I am a middleware named Mid1")
    next()
}

const midWarUser = function(req,res,next){
    const storeData = req.headers['isfreeappuser']
    // console.log(storeData)
    if(storeData != null){
        next()
    }
    else{
        console.log(req.headers)
        req.headers.isFreeAppUser = true
        // req.isfreeappuser = true
        console.log(req.headers)
        // res.send("Request is missing an important header")
        next()
    }
}



const mid2= function ( req, res, next) {
    console.log("Hi I am a middleware named Mid2")
    next()
}

const mid3= function ( req, res, next) {
    console.log("Hi I am a middleware named Mid3")
    next()
}

const mid4= function ( req, res, next) {
    console.log("Hi I am a middleware named Mid4")
    next()
}

const abc = function(req, res, next) {
    //get the users IP
    //save it in db
    // console log
    next()
}

const def = function(req, res, next) {
   //get the users IP
   //save it in db
   // console log
   next()
}

const xyz = function(req, res, next) {
   //get the users IP
   //save it in db
   // console log
   next()
}


module.exports.midWarUser = midWarUser
module.exports.mid1= mid1
module.exports.mid2= mid2
module.exports.mid3= mid3
module.exports.mid4= mid4
module.exports.abc = abc
