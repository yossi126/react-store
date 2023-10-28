const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Please provide product name"],
    maxLength: [100, "Name can not be more than 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please provide product price"],
    default: 0,
  },
  description: {
    type: String,
    required: [true, "Please provide product description"],
    maxLength: [300, "Description can not be more than 100 characters"],
  },
  brand: {
    type: String,
    required: [true, "Please provide product brand"],
    maxLength: [100, "Brand can not be more than 100 characters"],
  },
  images: {
    type: [String],
    required: [true, "Please provide at least one product image url"],
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Product", ProductSchema);
