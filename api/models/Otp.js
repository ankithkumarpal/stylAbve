const mongoose = require('mongoose');
const Address = require('./Address')
const OtpSchema = new mongoose.Schema({
    email : {
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '10m'  
    }
},{timestamps:true})

module.exports= mongoose.model("Otp",OtpSchema);