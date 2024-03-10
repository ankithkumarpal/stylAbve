
const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    area: {
        type: String,
        required: true
    },
    doorNo: {
        type: String,
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
    country : {
        type : String , 
        required : true
    }
});

const Address = mongoose.model("Address",AddressSchema);

module.exports = Address;