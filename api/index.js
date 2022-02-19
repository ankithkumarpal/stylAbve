const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const orderRoute = require('./routes/order')
const stripeRoute = require('./routes/stripe');
const cors  = require('cors');


dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONOGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
   // useCreateIndex:true,
}).then(console.log("mongo connected")).catch((err)=>{console.log(err)});

app.use(cors());
app.use('/api/auth',authRoute);
app.use('/api/orders',orderRoute);
app.use('/api/pay',stripeRoute);

app.use(express.static(path.join(__dirname,"/client/build")));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'/client/build','index.html'))
})

app.listen(process.env.PORT || 5000,()=>{
    console.log("successful server connection ")
})