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

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // For JSON data
app.use(bodyParser.urlencoded({ extended: false })); // For URL-encoded form data
app.use(bodyParser.json()); // For JSON data (redundant with express.json(), but useful if you want to handle both)

app.use(cors()); // Enable CORS

// Connect to MongoDB
mongoose.connect(process.env.MONOGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

// Static Files
app.use('/files', express.static("files"));

// Routes
app.use('/api/auth', authRoute);
app.use('/api/orders', orderRoute);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/profile', profileRoute);
app.use('/api/email', emailRoute);
app.use('/api/payment-gateway', paymentRoute);

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start Server
app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running on port", process.env.PORT || 5000);
});
