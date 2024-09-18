const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoute = require('./routes/auth');
const orderRoute = require('./routes/order');
const productRoute = require('./routes/products');
const cartRoute = require('./routes/cart');
const profileRoute = require('./routes/profile');
const emailRoute = require('./routes/email');
const paymentRoute = require('./routes/payment');
const Authorization = require('./Middleware/Authorization')
require('./CronJobs/KeepAliveJob');

dotenv.config();

const app = express();

// Add middleware here only.
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors()); 

mongoose.connect(process.env.MONOGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

app.use('/files', express.static("files"));

app.use('/api/auth', authRoute);
app.use('/api/orders',Authorization,orderRoute);
app.use('/api/product', productRoute);
app.use('/api/cart', Authorization, cartRoute);
app.use('/api/profile', Authorization, profileRoute);
app.use('/api/email', emailRoute);
app.use('/api/payment-gateway', paymentRoute);


app.get('/keep-alive', (req, res) => {
    res.send('Server is alive!');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
  
app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running on port", process.env.PORT || 5000);
});