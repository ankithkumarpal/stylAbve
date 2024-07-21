const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  createdAt: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Files',
  }],
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
