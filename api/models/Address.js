const mongoose = require('mongoose');

const Address = new mongoose.Schema({
    area: {
        type: String,
        required: true
    },
    doorno: {
        type: Number,
        required: true
    },
    landmark: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

module.exports = Address;