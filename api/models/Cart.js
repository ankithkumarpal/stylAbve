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
    },
    color : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    image: { data: Buffer, contentType: String}
},{timestamps:true});

module.exports= mongoose.model("Cart",CartSchema);