const router = require("express").Router();
const Cart = require("../models/Cart");
const User = require('../models/Users');
const Product = require("../models/Product");
const Response = require("../provider/requestResponse");

router.post("/add-to-cart", async (req, res) => {
  try {
    const isExist = await Cart.find({email : req.body.email , productId : req.body.productId});
    if(isExist.length !==0){
      return res.status(200).json(new Response(true, "Already Exist", null));
    }else{
      const newCart = new Cart({
        email: req.body.email,
        price: req.body.price,
        color: req.body.color,
        productId : req.body.productId,
        quantity : 1,
        // image : {
        //   data : fs.readFileSync('uploads/' +  req.file.filename),
        //   contentType : "image/png"
        // }
        });
        const cart = await newCart.save();
        return res.status(200).json(new Response(true, "Added to cart sucessfully", cart));
      }
  } catch (err) {
    res.status(503).json(err);
  }
});

router.get("/get-cart/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if(!user) {
      return res.status(200).json(new Response(false, "Product fetching failed", null));
    }
    const email = user.email;
    const cartDetail = await Cart.find({ email }).sort({ createdAt: -1 });

    const products = await Promise.all(
      cartDetail.map(async (product) => {
        const pr = await Product.findById(product.productId);
        return {
          image: pr.image,
          email : product.email,
          price : product.price,
          quantity : product.quantity, 
          color : product.color,
          productId : product.productId,
          _id : product._id
        };
      })
    );
    return res.status(200).json(new Response(true, "Product fetched successfully", products));
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.get("/remove-product/:id", async (req, res) => {
    try {
      await Cart.deleteOne({_id:req.params.id})
      return res.status(200).json(new Response(true, "Product removed successfully", null));
    } catch (err) {
      return res.status(500).json(err);
    }
});

module.exports=router;