const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  editUser,
  deleteUser,
} = require("../controllers/userController");

const {
  authenticatedUser,
  authorizePermissions,
} = require("../middleware/authentication");

router
  .route("/")
  .get([authenticatedUser, authorizePermissions("admin")], getAllUsers);
router
  .route("/:id")
  .patch([authenticatedUser, authorizePermissions("admin")], editUser)
  .delete([authenticatedUser, authorizePermissions("admin")], deleteUser);

module.exports = router;
