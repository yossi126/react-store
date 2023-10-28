const User = require("../models/user");

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).json({ msg: "User not found" });
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    //const { name, email, password, role } = req.body;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) return res.status(400).json({ msg: "User not found" });
    res.send(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(400).json({ msg: "User not found" });
    res.send({ message: "User deleted", user });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  getAllUsers,
  editUser,
  deleteUser,
  getUser,
};
