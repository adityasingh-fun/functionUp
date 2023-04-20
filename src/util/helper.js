const presentDate  =new Date()

function printDate(){
    console.log(presentDate)
}

function currentMonth(){
    const month = presentDate.getMonth()
    console.log("Current month is",month+1)
}

function getBranchInfo(){
    console.log("Techetium,W5D3, The topic for today is Nodejs modules system")
}

module.exports.printDate = printDate
module.exports.currentMonth = currentMonth
module.exports.getBranchInfo = getBranchInfo