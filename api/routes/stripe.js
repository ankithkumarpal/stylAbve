const router = require('express').Router();
const stripe= require('stripe')('sk_test_51JyAT3SC7uOQJa7q3I8tUroK8VlKfG0lho0Jo89Jpqo6RN2rtlXDumOonwgFEMEedw7zQoNn4YenUTnWrLKCGisy0006VBPa3O')

router.post('/payment',(req, res)=>{
  
    // Moreover you can take more details from user
    // like Address, Name, etc from form
    stripe.charges.create({
        amount: req.body.amount,     
        currency: 'INR',
        source:req.body.tokenId,
        email:req.body.email
    },(stripeErr,stripeRes)=>{
        if(stripeErr){
            res.status(500).json(stripeErr);
        }else{
            res.status(200).json(stripeRes);
        }
    });
})

module.exports = router;