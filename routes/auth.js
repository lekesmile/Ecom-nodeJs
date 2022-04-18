const express = require('express')
const router = express.Router()
const User = require('../models/User')
const CryptoJS = require("crypto-js")
const jwt = require('jsonwebtoken')



router.post("/register", async (req, res)=>{
    
      const {username, email, password} = req.body
      const NewUser = new User({
        
         username : username,
         email: email,
         password: CryptoJS.AES.encrypt(password, process.env.SECRET_PASS).toString()
         
    })

     
  try  {
      const  SaveUser = await NewUser.save()
      return res.status(201).json(SaveUser)
    
  } catch (error) {
     return res.status(501).json(error)
  }

   
})


router.post("/login",  async (req, res) => {
    try {
        const {username} = req.body
        const user = await User.findOne({username: username})

        
        if(!user){
            return res.status(401).json("No user found on the database " )
        }
        
        const typedPassword = req.body.password
        const bytes  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_PASS);
        const Initialpassword = bytes.toString(CryptoJS.enc.Utf8)
        
        if (typedPassword != Initialpassword ) {
             return res.status(401).json("You have input a wrong password")
         }
        
         
          
        const token = jwt.sign(
          {
            name:user.username,
            id: user._id,
            isAdmin: user.isAdmin,
            
          }, process.env.SECRET_JWT, { expiresIn: "2d" });

      
        return res.status(200).json( {user, token})
      
    } catch (error) {
        return res.status(501).json(error.message)
    }

})


module.exports = router