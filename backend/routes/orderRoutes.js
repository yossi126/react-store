const express = require("express");
const router = express.Router();

const { authenticatedUser } = require("../middleware/authentication");

const { createOrder } = require("../controllers/orderController");

router.route("/").post(authenticatedUser, createOrder);

module.exports = router;
