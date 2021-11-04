const UserModule = require("../models/userModule");
const get_all_users = async (req, res) => {
  try {
    const users = await UserModule.find({});
    if (users.length < 1) {
      return res.json({ success: false, msg: "non users fund" });
    }
    res.json({ success: true, users });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};
const add_user = async (req, res) => {
  try {
  } catch (error) {
    res.json({ error });
  }
};
const get_one_user = async (req, res) => {
  try {
  } catch (error) {
    res.json({ error });
  }
};
const update_user = async (req, res) => {
  try {
  } catch (error) {
    res.json({ error });
  }
};
const delete_user = async (req, res) => {
  try {
  } catch (error) {
    res.json({ error });
  }
};

module.exports = {
  get_all_users,
  add_user,
  get_one_user,
  update_user,
  delete_user,
};
