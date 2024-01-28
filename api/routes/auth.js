const jwt = require('jsonwebtoken');
const router = require('express').Router();
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
            res.status(400).json(req.email);
        }
        if(req.body.password=== user.password){
            // const acessToken = generateAccessToken(user);
            // const refreshToken = generateRefreshToken(refreshToken);
            // const accessToken = jwt.sign({user} , "mykey");
            // // res.status(200).json({
            // //     email : user.email,
            // //     isAdmin : user.isAdmin,
            // //     accessToken
            // // })
            res.status(200).json(user);
        }else{
            res.status(400).json("wrong credentials ");
        }
  }catch(err){
      res.status(500).json(err);
  }
})

const verifyToken = (req , res , next) => {
    const header = req.headers.authorization;
    if(header){
         const token = header.split(" ")[1];
         jwt.verify(token , "mykey" , (err , user)=> {
            if(err) res.status(403).json("token in not valid");
            req.user = user;
            next();
         })
    }else {
        res.status(401).json("not authorized");
    }
}

module.exports=router;