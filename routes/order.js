const express = require('express')
const app = express()
const router = express.Router()
const Order = require('../models/Order')
const {verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin} = require("../middleware/auth_rights");


router.get("/", verifyTokenAndAdmin, async (res, req) => {
    const getAllOrders = await Order.find({})
    res.status(200).json({success: true, getAllOrders})
    
})

router.post("/", verifyToken, (res, req)=>{

    
})


module.exports = router