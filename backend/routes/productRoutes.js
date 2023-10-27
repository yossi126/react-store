const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  editProduct,
  deleteProduct,
  addProduct,
  getProductUsers,
  getProduct,
} = require("../controllers/productsController");
const {
  authenticatedUser,
  authorizePermissions,
} = require("../middleware/authentication");

// optional
router
  .route("/")
  .get(authenticatedUser, getAllProducts)
  .post([authenticatedUser, authorizePermissions("admin")], addProduct);

router.route("/:id/users").get(authenticatedUser, getProductUsers);

router
  .route("/:id")
  .get([authenticatedUser, authorizePermissions("admin")], getProduct)
  .patch([authenticatedUser, authorizePermissions("admin")], editProduct)
  .delete([authenticatedUser, authorizePermissions("admin")], deleteProduct);

module.exports = router;
