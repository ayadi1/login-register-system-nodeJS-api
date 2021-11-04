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
    const { id: userID } = req.params;
    const user = await UserModule.findById(userID);
    if(!user){
      return res.json({ success: false, msg: "non users fund" });
    }
    res.json({ success: true, user });

  } catch (error) {
    return res.json({ success: false, msg: `non user fund with id : ${req.params.id}`});

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
