const express = require("express");
const router = express.Router();

const { authenticatedUser } = require("../middleware/authentication");

const { createOrder, getOrderById } = require("../controllers/orderController");

router.route("/").post(authenticatedUser, createOrder);
router.route("/:id").get(authenticatedUser, getOrderById);

module.exports = router;
