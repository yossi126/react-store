const Order = require("../models/order");
const Product = require("../models/product");
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("products");
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const createOrder = async (req, res) => {
  try {
    let newOrder = new Order({ ...req.body });
    const order = await Order.create(newOrder);

    // add the user id to the product if it doesn't exist
    // this is for knowing which user has bought which product

    // array of product ids from the client
    const productsIds = req.body.products;
    // user id from the middleware
    const userId = req.user.userId;
    //loop through the products
    for (const id of productsIds) {
      const product = await Product.find({
        _id: { $in: productsIds },
        users: { $in: [userId] },
      });
      // if the product dont have the user id then add it
      if (product.length === 0) {
        const result = await Product.updateOne(
          { _id: id },
          { $addToSet: { users: userId } }
        );
      }
    }

    return res
      .status(200)
      .json({ message: "Order created successfully", orderId: order._id });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrderById,
};
