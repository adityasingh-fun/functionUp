const express = require('express');
const bodyParser = require('body-parser');

const route = require('./routes/route');
const app = express();

const multer = require('multer');
const {AppConfig} = require('aws-sdk');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(multer().any());

app.use('/',route);

app.listen(process.env.PORT || 3000, function(){
    console.log("Express app running at port "+ (process.env.PORT || 3000))
})

























// const express = require('express');
// var bodyParser = require('body-parser');

// const route = require('./routes/route.js');

// const app = express();

// const multer= require("multer");
// const { AppConfig } = require('aws-sdk');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use( multer().any())

// app.use('/', route);

// app.listen(process.env.PORT || 3000, function() {
//     console.log('Express app running on port ' + (process.env.PORT || 3000))
// });
