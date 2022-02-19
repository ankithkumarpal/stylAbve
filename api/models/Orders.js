const mongoose = require('mongoose');
const OrdersSchema = new mongoose.Schema({
    phone:{
       type:String,
       required:true
    },
    names:{
        type:Array,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"placed"
    }
},{timestamps:true})

module.exports= mongoose.model("Orders",OrdersSchema);