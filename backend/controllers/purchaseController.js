const Purchase = require("../models/purchase");
const Order = require("../models/order");

const getAllPurchases = async (req, res) => {
  const { user, createdAt, product, totalPrice } = req.query;

  const queryObject = {};
  let matchObject = {};
  if (user) {
    queryObject.user = user;
  }
  const dates = await Purchase.find({});
  dates.forEach((date) => {
    //console.log(date.createdAt.toISOString().substring(0, 10));
  });
  //console.log(dates);

  if (createdAt) {
    //console.log(createdAt);
    // console.log(createdAt.substring(0, 10) === "2023-10-28");
    const startOfDay = new Date(createdAt);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(createdAt);
    endOfDay.setHours(23, 59, 59, 999);
    queryObject.createdAt = { $gte: startOfDay, $lte: endOfDay };
    console.log(queryObject.createdAt);
  }

  if (product) {
    matchObject.product = product;
  }

  if (totalPrice) {
    matchObject.totalPrice = parseInt(totalPrice);
  }

  try {
    // const purchases = await Purchase.find(queryObject).populate({
    //   path: "order",
    //   match: matchObject,
    // });
    const purchases = await Purchase.find(queryObject).populate({
      path: "order",
    });

    res.status(200).json({ purchases });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const createPurchase = async (req, res) => {
  // id of the order is sent from the client
  const order = req.body.order;
  // from the middleware
  const userId = req.user.userId;

  const newPurchase = { user: userId, order: order };

  try {
    const purchase = await Purchase.create(newPurchase);
    return res.status(201).json({ message: "Purchase created", purchase });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// http://localhost:3000/purchase/users/?userId=6534306ec9904d7b995d2009
const getPurchaseByUserId = async (req, res) => {
  try {
    const userId = req.query.userId;
    const purchases = await Purchase.find({ user: userId }).populate({
      path: "order",
      populate: {
        path: "products",
        model: "Product",
      },
    });
    res.status(200).json({ purchases });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  createPurchase,
  getAllPurchases,
  getPurchaseByUserId,
};
