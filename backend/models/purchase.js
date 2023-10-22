const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Purchase", PurchaseSchema);
