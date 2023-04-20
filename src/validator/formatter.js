

function trimString(string){
    const text = string.trim()
    console.log("The trimmed string is",text)
}

function changeToLowerCase(string){
    const text = string.toLowerCase()
    console.log("Lower case string is:",text)
}

function changeToUpperCase(string){
    const text = string.toUpperCase()
    console.log("The upper case string is",text)
}


module.exports.trimString = trimString
module.exports.changeToLowerCase = changeToLowerCase
module.exports.changeToUpperCase = changeToUpperCase