const express = require('express')
const app = express()
const router = express.Router()
const Product = require("../models/Product")
const { verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,} = require("../middleware/auth_rights")


//GET ALL PRODUCT with Quaries

router.get("/", verifyTokenAndAdmin, async (req, res) => {

  const queryNew = req.query.new
  const queryCategory = req.query.categories
  try {
       
    let getProducts;

    if (queryNew){
      getProducts = await Product.find().sort({createdAt: -1}).limit(10)
    }
    else if (queryCategory){
      getProducts = await Product.find({categories:{$in :[queryCategory]}})
    }
    else{
       getProducts = await Product.find({})
       return res.status(201).json({"Success": true, getProducts })
    }
      

  } catch (error) {
      return res.status(400).json(error) 
  }
   

})


// GET A SINGLE PRODUCT

router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {

  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).json(user);
    
  } catch (err) {
   return  res.status(500).json(err);
  }
});

//POST

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
       const saveProduct = await newProduct.save()
       return res.status(200).json({"Success": true, saveProduct})   

     } catch (error) {
        return res.status(400).json(error) 
     }
    

    
})

//UPDATE

router.put("/:id", verifyTokenAndAdmin, async(req, res) =>{

  try {
    const editproduct = await Product.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true})
  return res.status(200).json({"Success": true, editproduct})

  } catch (error) {
    return res.status(400).json({"success": false, error})
  }
  

})

 //DELETE
 router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router