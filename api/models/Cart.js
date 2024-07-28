const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    productId : {
        type : String , 
        required : true
    },
    quantity : {
        type : Number,
        required : true
    }
},{timestamps:true});

module.exports= mongoose.model("Cart",CartSchema);