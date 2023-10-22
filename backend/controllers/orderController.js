const Order = require("../models/order");

const createOrder = async (req, res) => {
  let newOrder = new Order({ ...req.body });
  await Order.create(newOrder);
  res.send("Order created");
};

module.exports = {
  createOrder,
};
