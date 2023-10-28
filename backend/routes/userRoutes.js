const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  editUser,
  deleteUser,
  getUser,
} = require("../controllers/userController");

const {
  authenticatedUser,
  authorizePermissions,
} = require("../middleware/authentication");

router.route("/").get(authenticatedUser, getAllUsers);
router
  .route("/:id")
  .get(authenticatedUser, getUser)
  .patch([authenticatedUser, authorizePermissions("admin")], editUser)
  .delete([authenticatedUser, authorizePermissions("admin")], deleteUser);

module.exports = router;
