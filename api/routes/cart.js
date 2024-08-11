const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const User = require('../models/Users');
const Product = require("../models/Product");
const Response = require("../provider/requestResponse");
const { GridFSBucket } = require('mongodb');
const mongoose = require('mongoose');

const conn = mongoose.createConnection(process.env.MONOGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let bucket;

conn.once('open', () => {
  bucket = new GridFSBucket(conn.db, { bucketName: 'uploads' });
});


router.post("/add-to-cart", async (req, res) => {
  try {
    const isExist = await Cart.find({ email: req.body.email, productId: req.body.productId });
    const user = await User.findOne({email :req.body.email});
    if(user == null) {
      return res.status(404).json(new Response(false , "no user found"))
    }
    
    if (isExist.length !== 0) {
      return res.status(200).json(new Response(true, "Already Exist", null));
    } else {
      const newCart = new Cart({
        email: req.body.email,
        price: req.body.price,
        productId: req.body.productId,
        quantity:req.body.quantity
      });
      const cart = await newCart.save();
      return res.status(200).json(new Response(true, "Added to cart successfully", cart));
    }
  } catch (err) {
    res.status(503).json("error:" , err.message);
  }
});


router.get("/get-cart/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json(new Response(false, "User not found", null));
    }
    const email = user.email;
    const cartDetail = await Cart.find({ email }).sort({ createdAt: -1 }).lean();

    const products = await Promise.all(
      cartDetail.map(async (cartItem) => {
        const product = await Product.findById(cartItem.productId).populate('imageIds').lean();
        
        const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
        
        const images = product.imageIds.map(image => `${baseUrl}/api/product/image/${image.filename}`);

        return {
          ...cartItem,
          productDetails: {
            productId: product._id,
            price: product.price,
            images
          },
        };
      })
    );

    return res.status(200).json(new Response(true, "Cart fetched successfully", products));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});


router.get("/remove-product/:id", async (req, res) => {
  try {
    await Cart.deleteOne({ _id: req.params.id });
    return res.status(200).json(new Response(true, "Product removed successfully", null));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

router.put("/update-quantity/:orderId", async (req, res) => {
  try {
    const { quantity } = req.body;
    const { orderId } = req.params;
    const updatedCart = await Cart.findByIdAndUpdate(
      orderId,
      { quantity },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json(new Response(false, "Cart item not found", null));
    }
    return res.status(200).json(new Response(true, "Quantity updated successfully"));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});


module.exports = router;
