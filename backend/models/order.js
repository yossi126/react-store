const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    totalPrice: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
