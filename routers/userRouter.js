const express = require("express");
const {
  get_all_users,
  add_user,
  get_one_user,
  update_user,
  delete_user,
} = require("../controllers/userControllers");
const route = express.Router();

route.route("/").get(get_all_users).post(add_user);
route.route("/:id").get(get_one_user).delete(delete_user).patch(update_user);

module.exports = route