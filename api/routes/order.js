const router = require("express").Router();
const { findById } = require("../models/Orders");
const Orders = require("../models/Orders");
const Users = require("../models/Users");
const Response = require("../provider/requestResponse");

router.post("/order", async (req, res) => {
  try {
    const newOrder = new Orders({
      userId: req.body.userId,
      productId: req.body.productId,
      amount: req.body.amount,
      address: req.body.address,
    });
    const order = await newOrder.save();
    return res
      .status(200)
      .json(new Response(true, "Order placed sucessfully", order));
  } catch (err) {
    return res.status(500).json(new Response(false, "Exception occured", err));
  }
});

// fetch particular order by id 

router.get("/order/:id", async (req, res) => {
  return res.status(200).json("hi");
  // try {
  //   const order = await Orders.findById({userId : req.params.id});
  //   res.status(200).json(new Response(false, "Orders fetched successfully", order));
  // } catch (err) {
  //   res.status(500).json(new Response(false, "Exception occured", err));
  // }
});


// cancel particular order using order id  

router.get("/cancel-order/:id", async (req, res) => {
  try {
    const order = await Orders.findByIdAndUpdate(req.params.id , {status : ""},{new : true});
    res.status(200).json(new Response(false, "Orders fetched successfully", order));
  } catch (err) {
    res.status(500).json(new Response(false, "Exception occured", err));
  }
});

 


router.put("/update/:id", async (req, res) => {
  try {
    const updated = await Orders.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    res.status(200).json(updated.status);
  } catch (err) {
    res.status(200).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    const email = user.email;
    const userOrder = await Orders.find({ email }).sort({ createdAt: -1 });
    res.status(200).json(userOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/", async (req, res) => {
  try {
    const orders = await Orders.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
