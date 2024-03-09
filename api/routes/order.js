const router = require("express").Router();
const { findById } = require("../models/Orders");
const Orders = require("../models/Orders");
const Users = require("../models/Users");

router.post("/order", async (req, res) => {
  try {
    const newOrder = new Orders({
      phone: req.body.phone,
      names: req.body.names,
      email: req.body.email,
      amount: req.body.amount,
    });
    const order = await newOrder.save();
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
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
router.get("/singleorder/:id", async (req, res) => {
  try {
    const user = await Orders.findById(req.params.id);
    res.status(200).json(user);
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
