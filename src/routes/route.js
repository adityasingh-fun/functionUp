const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();




router.get('/movies', function (req, res) {
    const mov = ["dil chahata hai","Zindagi na milegi doobara","Race","3 idiots"]

    res.send(mov)
});

router.get('/movies/:indexNumber', function (req, res) {
    const mov = ["dil chahata hai","Zindagi na milegi doobara","Race","3 idiots"];
    let index = req.params.indexNumber;
    if(index < 0 || index > mov.length){
        res.send("Data not found")
    }
    else{
        res.send(mov[index]);
    }

    // console.log(index)
    
});

router.get('/films', function(req, res){
    const arr = [ {
        id: 1,
        name: "The Shining"
       }, {
        id: 2,
        name: "Incendies"
       }, {
        id: 3,
        name: "Rang de Basanti"
       }, {
        id: 4,
        name: "Finding Nemo"
       }]

       return res.send(arr)
       
})

router.get('/films/:filmId', function (req, res){
    const arr = [ {
        id: 1,
        name: "The Shining"
       }, {
        id: 2,
        name: "Incendies"
       }, {
        id: 3,
        name: "Rang de Basanti"
       }, {
        id: 4,
        name: "Finding Nemo"
       }]
    for(let i=0;i<arr.length;i++){
        if(arr[i].id == req.params.filmId){
            return res.send(arr[i]);
        } 
    } 
    return res.send("‘No movie exists with this id")  
})

router.get('/students', function(req, res){
    // receive or access the query params in the code
    // write a logic on these query params
    // city, score
    console.log(req.query)
    let requestedCity = req.query.city
    let sortField = req.query.sort
    // logic to get students
    res.send(["Sabiha","Neha","Akash","Sonali"])
})

router.get('/students/:studentName', function(req, res) {
    console.log(req.params.studentName)
    /// go to database and search for studentName student
    // store the data found in this variable - studentDetails
    //res.send({data: studentDetails})
    res.send('student data')
})


module.exports = router;