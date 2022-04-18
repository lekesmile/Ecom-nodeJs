const express = require('express')
const app = express()
const router = express.Router()

router.get("/", (res, req) => {
    console.log("Hello test")
})

router.post("/", (res, req)=>{
const username = req.body.username
console.log(username)
    
})


module.exports = router