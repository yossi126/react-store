const Product = require("../models/product");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: "Error getting the products" });
  }
};

const editProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndUpdate(
      { _id: productId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!product) {
      res.status(404).json({ message: `No product with id ${productId}` });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: "Error edit the products" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      res.status(404).json({ message: `No product with id ${productId}` });
    }
    res.status(200).json({ message: "Product deleted", product });
  } catch (error) {
    res.status(404).json({ message: "Error deleting the product" });
  }
};

// optional
const addProduct = async (req, res) => {
  res.send("add product");
};

const getProductUsers = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId).populate("users");
    if (!product) {
      return res.status(404).send("Product not found");
    }
    const users = product.users;
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

module.exports = {
  getAllProducts,
  editProduct,
  deleteProduct,
  addProduct,
  getProductUsers,
};
