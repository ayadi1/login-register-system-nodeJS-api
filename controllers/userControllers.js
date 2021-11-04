const UserModule = require("../models/userModule");
const { hash_password, password_checker } = require("../middleware/password");
const { check_if_user_existe } = require("../middleware/user_checker");
//! get all users function start
const get_all_users = async (req, res) => {
  try {
    const users = await UserModule.find({});
    if (users.length < 1) {
      return res.json({ success: false, msg: "non users fund" });
    }
    res.json({ success: true, users });
  } catch (error) {
    console.log(error);
    res.json({ success: false, error });
  }
};
// get all users function end

//! register use function start
const add_user = async (req, res) => {
  try {
    let { email, password } = req.body;
    const userNotExiste = await check_if_user_existe(email);
    if (!email) {
      return res.json({ success: false, mes: "email is require" });
    }
    if (userNotExiste) {
      password = hash_password(password);
      const user = await UserModule.create({ email, password });
      return res.json({ success: true, user });
    }
    res.json({ success: false, msg: "email existe" });
  } catch (error) {
    res.json({ success: false, error });
  }
};
// register use function end

//! get one user by id function start
const get_one_user = async (req, res) => {
  try {
    const { id: userID } = req.params;
    const user = await UserModule.findById(userID);
    if (!user) {
      return res.json({ success: false, msg: "non users fund" });
    }
    res.json({
      success: true,
      user: { email: user.email, id: user._id, status: user.status },
    });
  } catch (error) {
    return res.json({
      success: false,
      msg: `non user fund with id : ${req.params.id}`,
    });
  }
};
// get one user by id function end

//! login user function start
const login_user = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userNotExiste = await check_if_user_existe(email);
    if (userNotExiste) {
      return res.json({ success: false, msg: "email not work" });
    }
    const user = await UserModule.findOne({ email });
    const hash = user.password;
    const passwordChecker = await password_checker(password, hash);
    if (!passwordChecker) {
      return res.json({ success: false, msg: "password not work" });
    }
    req.session.user = { userEmail: email, userID: user._id };
    res.json({ success: true, session: req.session });
  } catch (error) {
    res.json({ success: false });
  }
};
// login user function end

//! update user function start
const update_user = async (req, res) => {
  try {
    let body = req.body;
    if (body.password) {
      body.password = hash_password(body.password);
    }
    const { id: userID } = req.body;
    const user = await UserModule.findById(userID);
    if (!user) {
      return res.json({ success: false });
    }
    const newUserData = await UserModule.findByIdAndUpdate(userID, body, {
      runValidators: true,
      new: true,
    });
    res.json({ newUserData });
  } catch (error) {
    res.json({ success: false });
  }
};
// update user function end

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
  login_user,
};
