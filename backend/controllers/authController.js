const User = require("../models/user");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const user = await User.create({ ...req.body });
    const token = jwt.sign({ user }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      message: "user created",
      user: { name: user.name, role: user.role },
      token,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res.status(401).json("Please check your password");
  }

  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.status(200).json({ user: { name: user.name, role: user.role }, token });
};

module.exports = {
  register,
  login,
};

// 400 - bad request
// 200 - ok
// 201 - created
// 401 - unauthorized
