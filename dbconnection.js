const mongoose = require('mongoose')
const dotenv = require("dotenv")

dotenv.config()

try {
    mongoose.connect(process.env.DBURL )
    .then(()=>{
    console.log("Connected to db")
    })
} catch (error) {
    console.log(error)
}

module.exports = mongoose;