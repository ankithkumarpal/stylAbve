const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  contentType: String,
  metadata: {
    originalName: String,
    size: Number,
  },
});

module.exports = mongoose.model("Files", fileSchema);
