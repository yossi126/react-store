const jwt = require("jsonwebtoken");

const authenticatedUser = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // attach the user to the job routes
    req.user = {
      userId: payload.user._id,
      name: payload.user.name,
      role: payload.user.role,
    };

    next();
  } catch (error) {
    return res.status(401).json("Authentication invalid");
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json("Unauthorized to access this route");
    }
    next();
  };
};

module.exports = { authenticatedUser, authorizePermissions };
