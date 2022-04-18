const express = require('express')
const app = express()
const router = express.Router()
const Product = require("../models/Product")
const { verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,} = require("../middleware/auth_rights")

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
       
       const getProducts = await Product.find({})
       return res.status(201).json({"Success": true, getProducts })

  } catch (error) {
      return res.status(400).json(error) 
  }
   

})

router.post("/", verifyTokenAndAdmin, async (req, res)=>{

    const {title,desc,img, categories,color, price} = req.body
    
     const newProduct = new Product({
        title : title,
        desc : desc,
        img : img,
        categories : categories,
        color : color,
        price : price
     })
     try {
       saveProduct = await newProduct.save()
       return res.status(201).json({"Success": true, saveProduct})   

     } catch (error) {
        return res.status(400).json(error) 
     }
    

    
})


module.exports = router