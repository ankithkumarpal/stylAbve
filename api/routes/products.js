const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const multer = require("multer");
const { GridFsStorage } = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');
const Response = require("../provider/requestResponse");
const dotenv = require('dotenv');
const path = require('path');
const Files = require('../models/files');

dotenv.config();

// MongoDB connection
const conn = mongoose.createConnection(process.env.MONOGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let bucket;

// Initialize GridFSBucket
conn.once('open', () => {
  bucket = new GridFSBucket(conn.db, { bucketName: 'uploads' });
});

// Configure GridFsStorage
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

// Upload file route
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
      imageIds: [savedFile._id], // referencing the file table
      imageUrls: [`/image/${file.filename}`] // Add URL here
    });

    const product = await newProduct.save();
    res.status(200).json(new Response(true, "Saved successfully", product));
  } catch (err) {
    console.error("Error saving product:", err);
    res.status(503).json(new Response(false, "Unable to save product", null));
  }
});

// Get products route
router.get("/get-products", async (req, res) => {
  try {
    const products = await Product.find().populate('imageIds');
    
    // Get base URL from environment variables
    const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
    
    // Construct image URLs for each product
    const productsWithImages = products.map(product => {
      return {
        ...product._doc,
        imageUrls: product.imageIds.map(image => `${baseUrl}/api/product/image/${image.filename}`)
      };
    });

    res.status(200).json(new Response(true, "Products fetched successfully", productsWithImages));
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json(new Response(false, "Error fetching products", null));
  }
});


// Serve images route
router.get('/image/:filename', (req, res) => {
  const { filename } = req.params;

  bucket.openDownloadStreamByName(filename)
    .on('error', (err) => {
      console.error("Error downloading file:", err);
      res.status(404).json({ msg: 'No file found' });
    })
    .pipe(res);
});

module.exports = router;
