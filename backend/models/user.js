const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minLength: 6,
  },
  city: {
    type: String,
    required: [true, "Please provide city"],
    minLength: 3,
    maxLength: 50,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = candidatePassword === this.password;
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
