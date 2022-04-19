const express = require('express')
const router = express.Router()
const User = require("../models/User");
const {verifyToken,verifyTokenAndAuthorization,verifyTokenAndAdmin} = require("../middleware/auth_rights");

  //GET USER
  router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {

    try {
      const user = await User.findById(req.params.id);
      return res.status(200).json(user);
      
    } catch (err) {
      return res.status(500).json(err);
    }
  });
  
  //GET ALL USER
  router.get("/", verifyTokenAndAdmin, async (req, res) => {

    console.log(req.user)
    const query = req.query.new;
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
        return  res.status(200).json(users);
    } catch (err) {
     
      return res.status(500).json(err);
    }
  });
  
  //GET USER STATS
  
  router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      return res.status(200).json(data)
    } catch (err) {
      return res.status(500).json(err);
    }
  });



//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_PASS ).toString();
    }
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //password reset

  router.patch('/reset/:id', verifyToken, async (req, res)=>{
     const user = await User.findById(req.params.id)
    if (!user) {
      
     return res.status(401).json("no user found")
    }
    const newbody = await User.findOneAndUpdate({
         password : req.body.password
    })
     return res.status(201).json({"success": true , user})
  })
  
  //DELETE
  router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

  
  module.exports = router;