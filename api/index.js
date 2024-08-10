const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const authRoute = require('./routes/auth');
const orderRoute = require('./routes/order');
const productRoute = require('./routes/products');
const cartRoute = require("./routes/cart");
const profileRoute = require('./routes/profile');
const cors  = require('cors');
const verifyToken = require('./Middleware/Authorization');

dotenv.config();
app.use(express.json());

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json())

console.log(process.env.MONOGO_URL);
mongoose.connect(process.env.MONOGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(console.log("mongo connected")).catch((err)=>{console.log(err)});

app.use(cors());

app.use('/files' , express.static("files"));
app.use('/api/auth',authRoute);
app.use('/api/orders' , orderRoute);
app.use('/api/product' , productRoute);
app.use('/api/cart' , cartRoute)
app.use('/api/profile' ,profileRoute)
app.listen(process.env.PORT || 5000,()=>{
    console.log("successful server connection ")
})