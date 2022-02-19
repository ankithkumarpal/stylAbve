const router = require('express').Router();
const { findOne } = require('../models/Users');
const User = require('../models/Users');

router.post('/register', async (req,res)=>{

    try{
        const newUser = new User({
            email:req.body.email,
            phone:req.body.phone,
            password:req.body.password
        })
        const user  = await newUser.save();
        res.status(200).json(user);
    }catch(err){
     res.status(500).json(err)
    }
})


router.post('/login',async (req,res)=>{
  try{
        const user = await User.findOne({email:req.body.email});
        if(!user){
            res.status(400).json("wrong credentials ");
        }

        if(req.body.password=== user.password){
            res.status(200).json(user);
        }else{
            res.status(400).json("wrong credentials ");
        }
  }catch(err){
      res.status(500).json(err);
  }
})

module.exports=router;