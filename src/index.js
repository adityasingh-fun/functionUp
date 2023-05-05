const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();
const moment = require('moment')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://chaudharyaditya41:Z67gI1uJnrGCnHuY@cluster0.jgngtnq.mongodb.net/Aditya41-db?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

// app.use (
//     function (req, res, next) {
//         console.log ("inside GLOBAL MW");
//         next();
//   }
//   );

const assignmentMW= function (req, res, next) {

    const today = moment()
    const currentDate = today.format('YYYY-MM-DD')
    const currentTime = today.format('hh:mm:ss a')
    var datetime = currentDate + " " + currentTime;
    let ip= req.ip
    let url= req.originalUrl
    console.log(`${datetime} ${ip} ${url}`)
    next()
}
  
app.use(assignmentMW)


app.use('/', route);




app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
