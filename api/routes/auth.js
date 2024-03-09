const jwt = require('jsonwebtoken');
const router = require('express').Router();
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const Response = require('../provider/requestResponse')
const Authorization = require('../Middleware/Authorization')

router.post('/register', async (req,res)=>{
    try{
        const emailExists = await User.findOne({email : req.body.email});
        if(emailExists) {
            return res.status(200).json(new Response(false, 'Email Already Exists', null));
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            email:req.body.email,
            phone:req.body.phone,
            name : req.body.name,
            password: hashedPassword,
            isAdmin: req.body.isAdmin
        })

        await newUser.save();

        res.status(200).json(new Response(true, 'User added successfully', newUser));

    }catch(err){
        res.status(500).json(err)
    }
})

router.post('/login',async (req,res)=>{
  try{
        const user = await User.findOne({email:req.body.email});
        if(!user){
            res.status(400).json(new Response(false, 'Invalid Credentials', null));
        }

        const hashedPassword = await bcrypt.compare(req.body.password, user.password);
        if(hashedPassword){ 
            const token = jwt.sign({isAdmin: user.isAdmin }, process.env.PRIVATE_KEY, { expiresIn: '1h' });
            const data =  {
                token : token , 
                user : {
                    id : user.id,
                    name : user.name,
                    email : user.email
                }
            }
            res.status(200).json(new Response(true, 'Authentication successfull', data));
        }else{
            res.status(400).json(new Response(false, 'Invalid Credentials', null));
        }
  }catch(err){
      res.status(500).json(err);
  }
})

module.exports=router;