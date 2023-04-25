const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();


router.post('/post-req',function(req,res){
    // let id = req.body.user_id
    // let pwd = req.body.password
    // console.log(id,pwd)
    console.log(req.body)
    res.send( {msg : true})
})

let players = [
    {
        "name": "manish",
        "dob": "1/1/1995",
        "gender": "male",
        "city": "jalandhar",
        "sports": ["swimming"]
    },
    {
        "name": "gopal",
        "dob": "1/9/1995",
        "gender": "male",
        "city": "delhi",
        "sports": ["soccer"]
    },
    {
        "name": "lokesh",
        "dob": "1/1/1990",
        "gender": "male",
        "city": "mumbai",
        "sports": ["soccer"]
        }
]

router.get('/get__aap',function(req,res){
    res.send(players)
})

router.post('/players',function(req,res){
    let new_player = req.body
    let flag = 0
    for(let i=0;i<players.length;i++){
        if(players[i].name === req.body.name){
            flag++
        }
    }
    if(flag == 0){
        players.push(new_player)
    }
    // console.log(new_player)
    res.send( {data : players, status : true})
}) 



 // -write an api which gives the missing number in an array of integers starting from 1….e.g [1,2,3,5,6,7] : 4 is missing
 // Your route code will look like this
 router.get("/sol1", function (req, res) {
    //logic : sum of numbers is n(n+1)/2..so get sum of all numbers in array. now take sum of numbers till last digit in the array
    let arr= [1,2,3,5,6,7]
    let n = arr[arr.length-1] // value=7
    let sum = (n*(n+1))/2; // 28
    let arr_sum = 0
    for(let i=0;i<arr.length;i++){
        arr_sum = arr_sum + arr[i] //24
    }
    let missingNumber = sum - arr_sum;

    ///LOGIC WILL GO HERE 
    res.send(  { data: missingNumber  }  );
});



  // -write an api which gives the missing number in an array of integers starting from anywhere….e.g [33, 34, 35, 37, 38]: 36 is missing
 // Your route code will look like this
 router.get("/sol2", function (req, res) {
    //logic : sum of n consecutive numbers is [ n * (first + last) / 2  ]..so get sum of all numbers in array. now take sum of n consecutive numbers.. n would be length+1 as 1 number is missing
    let arr= [33, 34, 35, 37, 38]

    let n  = arr[arr.length-1]  // value=38
    let s = arr[0];             // value=33

    let sum =(n*(n+1)/2)-(s*(s-1)/2)   // sum of values 33,34,35,36,37,38
    
    let arr_sum = 0
    for(let i=0;i<arr.length;i++){
        arr_sum = arr_sum + arr[i]
    }
    // arr_sum sum of all elements of the array

    let missingNumber = sum - arr_sum

    ///LOGIC WILL GO HERE 

    res.send(  { data: missingNumber  }  );
});




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

       res.send(arr)
       
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
    res.send("‘No movie exists with this id")  
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