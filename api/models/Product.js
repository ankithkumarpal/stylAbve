const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
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

module.exports= mongoose.model("Product",ProductSchema);