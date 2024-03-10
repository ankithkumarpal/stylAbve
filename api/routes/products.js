const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");
const fs = require('fs');
const verifyToken = require('../Middleware/Authorization');
const Response = require("../provider/requestResponse");


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return  cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    return cb(null, uniqueSuffix+"");
  },
});

const upload = multer({storage : storage});

router.post("/upload-files",verifyToken, upload.single("image"), async (req, res) => {
  try {
    const newProduct = new Product({
      price : req.body.price,
      color : req.body.color,
      image : {
         data : fs.readFileSync('uploads/' +  req.file.filename),
         contentType : "image/png"
      }
    });
    const product = await newProduct.save();
    res.status(200).json(new Response(true, "Saved sucessfully", product));
  } catch (err) {
    res.status(503).json(new Response(false, "Unable to save product", null));
  }
});

router.get("/get-products", (req, res) => {
  Product.find().then((data, err) => {
    if (err) {
      return res.status(200).json(err);
    }
     return res.status(200).json(new Response(true, "products fetched successfully", data));
  });
});


module.exports = router;
