const mongoose = require("mongoose");

const UserShema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "email is require"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password is require"],
  },
  status: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", UserShema);
