const mongoose = require('mongoose');
const Address = require('./Address')
const OrdersSchema = new mongoose.Schema({
    userId : {
        type : String,
        required : true
    },
    names:{
        type:Array,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    productId : {
        type : [String],
        required : true
    },
    amount:{
        type:String,
        required:true
    },
    Address : {
        type : mongoose.Schema.Types.ObjectId,
        ref : Address,
        required : true
    },
    status:{
        type:String,
        default:"placed"
    }
},{timestamps:true})

module.exports= mongoose.model("Orders",OrdersSchema);