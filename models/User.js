const mongoose = require("mongoose")
require("../dbconnection")


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min:3,
        unique:true
    },
    email:{
        type:String,
        max:25,
        unique: [true, "email already exists in database!"],
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        min:6
    },
    isAdmin: {
        type: Boolean,
        default:false   
        },
        
    registeredDate:{
        type: Date,
        default: Date.now()
    }

    

},{timestapms: true})


module.exports = mongoose.model("User", UserSchema)