const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const multer = require("multer");
const { GridFsStorage } = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const gridfsStream = require('gridfs-stream');
const verifyToken = require('../Middleware/Authorization');
const Response = require("../provider/requestResponse");
const dotenv = require('dotenv');
const path = require('path');
const Files = require('../models/files')

dotenv.config();

const conn = mongoose.createConnection(process.env.MONOGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;

conn.once('open', () => {
  gfs = gridfsStream(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

const storage = new GridFsStorage({
  url: process.env.MONOGO_URL,
  file: (req, file) => {
    return {
      bucketName: 'uploads',
      filename: Date.now() + path.extname(file.originalname),
      metadata: {
        originalName: file.originalname,
        size: file.size,
      },
    };
  },
});

const upload = multer({ storage });

router.post("/upload-files", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;

    const newFile = new Files({
      filename: file.filename,
      contentType: file.mimetype,
      metadata: {
        originalName: file.originalname,
        size: file.size,
      },
    });

    const savedFile = await newFile.save();

    const newProduct = new Product({
      createdAt: new Date().toISOString(),
      price: req.body.price,
      imageIds: [savedFile._id] // referencing the file table
    });

    const product = await newProduct.save();
    res.status(200).json(new Response(true, "Saved successfully", product));
  } catch (err) {
    res.status(503).json(new Response(false, "Unable to save product", null));
  }
});

router.get("/get-products", async (req, res) => {
  try {
    const products = await Product.find().populate('imageIds');
    res.status(200).json(new Response(true, "Products fetched successfully", products));
  } catch (err) {
    res.status(500).json(new Response(false, "Error fetching products", null));
  }
});

module.exports = router;
