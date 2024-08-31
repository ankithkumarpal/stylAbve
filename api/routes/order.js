const router = require("express").Router();
const Orders = require("../models/Orders");
const Users = require("../models/Users");
const Product = require("../models/Product");
const Response = require('../provider/requestResponse');
const { sendOrderConfirmationEmail, sendPencilCarvedOrderConfirmationEmail } = require("../provider/mailconfig");

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

const placeOrder = async (req , res)=>{
  try {
    const { userId, productDetails, amount, address, singleName, pairName, instruction , productType } = req.body;

    if (!address) return res.status(400).json(new Response(false, "Address required."));

    const serializedProductDetails = serializeProductDetails(productDetails);
    const serializedAddress = serializeAddress(address);

    const newOrder = new Orders({
      userId,
      productDetails: serializedProductDetails,
      amount,
      address: serializedAddress,
      singleName : singleName,
      pairName : pairName,
      instruction : instruction,
      productType
    });

    const order = await newOrder.save();

    await sendPencilCarvedOrderConfirmationEmail({
      ...req.body,
      productDetails: deserializeProductDetails(serializedProductDetails),
      address: deserializeAddress(serializedAddress)
    });

    res.status(200).json(new Response(true, "Pencil-carved item order placed", order));
  } catch (err) {
    console.error("Error placing pencil-carved item order:", err);
    res.status(500).json(new Response(false, err.message));
  }
}

router.post("/pencil-carve/place-order", placeOrder);

router.get("/get-order", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json(new Response(false, "User ID required"));
    }

    const orders = await Orders.find({ userId }).sort({ createdAt: -1 });

    if (orders.length === 0) {
      return res.status(200).json(new Response(true, "No records found"));
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

    res.status(200).json(new Response(true, "Order fetched", ordersPlain));
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json(new Response(false, err.message));
  }
});

router.put("/update-order", async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json(new Response(false, "Order ID required"));
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
      return res.status(404).json(new Response(false, "Order not found"));
    }

    res.status(200).json(new Response(true, "Update successful"));
  } catch (err) {
    console.error("Error updating order:", err);
    res.status(500).json(new Response(false, err.message));
  }
});

router.get("/get-all-orders", async (req, res) => {
  try {
    const orders = await Orders.find().sort({ createdAt: -1 });
    if (orders.length === 0) {
      return res.status(200).json(new Response(true, "No records found"));
    }
    const ordersPlain = orders.map(order => order.toObject());

    ordersPlain.forEach(item => {
      item.productDetails = deserializeProductDetails(item.productDetails);
      item.address = item.address ? deserializeAddress(item.address) : null;
    });

    res.status(200).json(new Response(true, "Orders fetched successfully", ordersPlain));
  } catch (err) {
    console.error("Error fetching all orders:", err);
    res.status(500).json(new Response(false, err.message));
  }
});

module.exports = router;
