const mongoose = require("mongoose")
require("../dbconnection")


const CartSchema = new mongoose.Schema({
   userId: {
        type: String,
        required: true,
    
    },
    products: [{
        productId:{
            type:String
        },
        quantity:{
            type:Number,
            default: 1,
        }
    }]
    

},{timestapms: true})


module.exports = mongoose.model("Cart", CartSchema)