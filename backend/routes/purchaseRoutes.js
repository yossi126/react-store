const express = require("express");
const router = express.Router();
const {
  createPurchase,
  getAllPurchases,
  getPurchaseByUserId,
} = require("../controllers/purchaseController");
const {
  authenticatedUser,
  authorizePermissions,
} = require("../middleware/authentication");

router
  .route("/")
  .get(authenticatedUser, getAllPurchases)
  .post(authenticatedUser, createPurchase);

router.route("/users").get(authenticatedUser, getPurchaseByUserId);

module.exports = router;
