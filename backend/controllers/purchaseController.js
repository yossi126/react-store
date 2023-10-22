const Purchase = require("../models/purchase");

const getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.find({});
    res.status(200).json({ purchases });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const createPurchase = async (req, res) => {
  try {
    const purchase = await Purchase.create(req.body);
    res.status(201).json({ msg: "Purchase created", purchase });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// http://localhost:3000/purchase/users/?userId=6534306ec9904d7b995d2009
const getPurchaseByUserId = async (req, res) => {
  try {
    const userId = req.query.userId;
    const purchases = await Purchase.find({ user: userId });
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
