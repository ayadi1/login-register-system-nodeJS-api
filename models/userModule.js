const mongoose = require("mongoose");

const UserShema = mongoose.Schema({
  email: {
    type: String,
    require: [true, "email is require"],
  },
  password: {
    type: String,
    require: [true, "password is require"],
  },
  status: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User',UserShema)
