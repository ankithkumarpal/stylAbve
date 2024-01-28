const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");
const fs = require('fs');


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

router.post("/upload-files", upload.single("image"), async (req, res) => {
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
    res.status(200).json("saved sucessfully");
  } catch (err) {
    res.status(503).json("Unable to save product");
  }
});

router.get("/get-products", (req, res) => {
  Product.find().then((data, err) => {
    if (err) {
      res.status(200).json(err);
    }
    res.status(200).json(data);
  });
});


module.exports = router;
