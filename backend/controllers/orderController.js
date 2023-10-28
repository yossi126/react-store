const Order = require("../models/order");

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("products");
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const createOrder = async (req, res) => {
  let newOrder = new Order({ ...req.body });
  await Order.create(newOrder);
  res.send("Order created");
};

module.exports = {
  createOrder,
  getOrderById,
};
