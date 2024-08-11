const router = require("express").Router();
const { findById } = require("../models/Orders");
const Orders = require("../models/Orders");
const Users = require("../models/Users");
const Product = require("../models/Product");
const Response = require('../provider/requestResponse');

const serializeProductDetails = (productDetails) => {
  return productDetails.map(detail => JSON.stringify(detail));
};

const deserializeProductDetails = (productDetails) => {
  return productDetails.map(detail => JSON.parse(detail));
};

const serializeAddress = (address) => {
  return JSON.stringify(address);
};

const deserializeAddress = (address) => {
  return JSON.parse(address);
};

router.post("/place-order", async (req, res) => {
  try {
    const user = await Users.findOne({_id : req.body.userId})
    if(user == null){
      return res.status(200).json(new Response(success = true , message = "no user found"));
    }
    const { userId, productDetails, amount, address } = req.body;

    const serializedProductDetails = serializeProductDetails(productDetails);
    if(!address) return res.status(400).json("Address required.");
    const serializedAddress = address ? serializeAddress(address) : null;

    const newOrder = new Orders({
      userId,
      productDetails: serializedProductDetails,
      amount,
      address: serializedAddress
    });

    const order = await newOrder.save();
    res.status(200).json(new Response(success = true , message = "order placed" , data = order));
  } catch (err) {
    res.status(500).json(new Response(success = true , message = err.message));
  }
});

router.get("/get-order", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json(new Response(success = false , message = "user id requierd"));
    }

    const orders = await Orders.find({ userId });

    if (orders.length === 0) {
      return res.status(200).json(new Response(success = true , message = "No records found"));
    }
    const ordersPlain = await Promise.all(orders.map(async (order) => {
      const orderPlain = order.toObject();
      const productDetails = deserializeProductDetails(orderPlain.productDetails);

      const products = await Promise.all(
        productDetails.map(async (detail) => {
          const product = await Product.findById(detail.productId).populate('imageIds').lean();
          const baseUrl = process.env.BASE_URL || 'http://localhost:5000';
          const images = product.imageIds.map(image => `${baseUrl}/api/product/image/${image.filename}`);
          
          return {
            productId: product._id,
            quantity: detail.quantity,
            price: product.price,
            images
          };
        })
      );

      return {
        ...orderPlain,
        productDetails: products,
        address: orderPlain.address ? deserializeAddress(orderPlain.address) : null
      };
    }));

    res.status(200).json(new Response(success = true , message = "order fetched" , data = ordersPlain));
  } catch (err) {
    res.status(500).json(new Response(success = false , message = err.message));
  }
});

router.put("/update-order", async (req, res) => {
  try {
    const { id } = req.query; 
    if (!id) {
      return res.status(400).json(new Response(success = false , message = "user id required"));
    }

    const updated = await Orders.findByIdAndUpdate(
      id,
      { 
        status: req.body.status,
        updatedAt: Date.now() 
      },
      { new: true } 
    );

    if (!updated) {
      return res.status(404).json(new Response(success = false , message = "Did not found order"));
    }

    res.status(200).json(new Response(success = true , message = "update successfull"));
  } catch (err) {
    res.status(500).json(new Response(success = false , message = err.message));
  }
});

router.get("/get-all-orders", async (req, res) => {
  try {
    const orders = await Orders.find().sort({ createdAt: -1 });
    if (orders.length === 0) {
      return res.status(200).json(new Response(success = true , message = "no record found"));
    }
    const ordersPlain = orders.map(order => order.toObject());

    ordersPlain.forEach(item => {
      item.productDetails = deserializeProductDetails(item.productDetails);
      item.address = item.address ? deserializeAddress(item.address) : null;
    });

    res.status(200).json(new Response(success = true , message = "order fetching successfull" , data = ordersPlain));
  } catch (err) {
    res.status(500).json(new Response(success == false , message = err.message));
  }
});

module.exports = router;
