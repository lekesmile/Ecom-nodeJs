const express = require("express")
const app =express()
const cors = require("cors")
const dotenv = require("dotenv")
const morgan = require('morgan')
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const product = require("./routes/product")
dotenv.config()
require("./dbconnection")


//Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('combined'))



//Routes
app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/product", product)



//Server
app.listen(process.env.PORT || 5000, ()=>{
    console.log('listerning on port 5k')
})