const express = require('express');
const router = express.Router();
const logger = require('../logger/logger.js')
const util = require('../util/helper.js')
const validator = require('../validator/formatter.js')

const lodash = require('lodash')

console.log(lodash.chunk(["jan","feb","mar","april","may","jun","july","aug","sep",'oct',"nov","dec"],3))
console.log(lodash.tail([1,3,5,7,9,11,13,15,17,19]))
console.log(lodash.union([1,2,3],[3,4,5,6],[5,6,7],[9,10,11],[7,8,9,11,12]))
console.log(lodash.fromPairs( [["horror","The Shining"],["drama","Titanic"],["thriller","Shutter Island"],["fantasy","Pans Labyrinth"]]))

router.get('/test-me',function(req,res){
    res.send("Response to lodash")
})

router.get('/test-me',function(req,res){
    validator.trimString("    FunctionUp   ")
    validator.changeToLowerCase("HELLO MY NAME IS ADITYA SINGH")
    validator.changeToUpperCase("hello i am a trainee at functionup")
    res.send("Module for validator")
})

router.get('/test-me',function(req,res){
    logger.welcome()
    res.send('This should be working')
})

router.get('/test-me',function(req,res){
    util.printDate()
    util.currentMonth()
    util.getBranchInfo()
    res.send("see this is woorking")
})

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

module.exports = router;