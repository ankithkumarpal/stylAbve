const mongoose = require('mongoose');


const PencilSchema = new mongoose.Schema({
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
    }]
})

module.exports = mongoose.model("PencilCarving",PencilSchema);

