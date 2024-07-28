const mongoose = require('mongoose');
const Address = require('./Address')
const OrdersSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    productDetails : {
        type : [String],
        required : true
    },
    amount:{
        type:String,
        required:true
    },
    address : {
        type : String,
        required : true
    },
    status:{
        type:String,
        default:"placed"
    },
    createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
},{timestamps:true})

module.exports= mongoose.model("Orders",OrdersSchema);