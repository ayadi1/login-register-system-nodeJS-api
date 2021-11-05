const UserModule = require("../models/userModule");
const { hash_password, password_checker } = require("../middleware/password");
const { check_if_user_existe } = require("../middleware/user_checker");
//! get all users function start
const get_all_users = async (req, res) => {
  try {
    const users = await UserModule.find({});
    if (users.length < 1) {
      return res.status(404).json({ success: false, msg: "non users fund" });
    }
    res.json({ success: true, users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};
// get all users function end

//! register use function start
const add_user = async (req, res) => {
  try {
    let { email, password } = req.body;
    const userNotExiste = await check_if_user_existe(email);
    if (!email) {
      return res.status(404).json({ success: false, mes: "email is require" });
    }
    if (userNotExiste) {
      password = hash_password(password);
      const user = await UserModule.create({ email, password });
      return res.json({ success: true, user });
    }
    res.status(404).json({ success: false, msg: "email existe" });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
// register use function end

//! get one user by id function start
const get_one_user = async (req, res) => {
  try {
    const { id: userID } = req.params;
    const user = await UserModule.findById(userID);
    if (!user) {
      return res.status(404).json({ success: false, msg: "non users fund" });
    }
    res.json({
      success: true,
      user: { email: user.email, id: user._id, status: user.status },
    });
  } catch (error) {
    return res.status(404).json({
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
    // chech if email existe if existe reture true if email existe
    if (userNotExiste) {
      return res.status(404).json({ success: false, msg: "email not work" });
    }
    const user = await UserModule.findOne({ email });
    const hash = user.password;
    // check if password match or not
    const passwordChecker = await password_checker(password, hash);
    if (!passwordChecker) {
      return res.status(404).json({ success: false, msg: "password not work" });
    }
    req.session.user = { userEmail: email, userID: user._id };
    res.json({ success: true, session: req.session });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};
// login user function end

//! update user function start
const update_user = async (req, res) => {
  try {
    // check if user logged in
    if (!req.session.user) {
      return res.status(403).json({ success: false, msg: "you have to login" });
    }
    let body = req.body;
    // check if user wanna update your password for hashed
    if (body.password) {
      body.password = hash_password(body.password);
    }
    const UpdatedUserID = req.session.user.userID;
    // checke if user existe
    const user = await UserModule.findById(UpdatedUserID);
    if (!user) {
      return res.status(404).json({ success: false });
    }
    const newUserData = await UserModule.findByIdAndUpdate(
      UpdatedUserID,
      body,
      {
        runValidators: true,
        new: true,
      }
    );
    res.json({ newUserData });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};
// update user function end

//! delete user function start
const delete_user = async (req, res) => {
  try {
    // check if user logged in
    if (!req.session.user) {
      return res.status(403).json({ success: false, msg: "you have to login" });
    }
    const deletetedUserID = req.session.user.userID;
    const { id: userID } = req.body;
    // check if user try to delete ather user
    if (deletetedUserID != userID) {
      return res
        .status(403)
        .json({ success: false, msg: "you don't have permission to do that" });
    }
    const user = await UserModule.findByIdAndDelete(userID);
    if (!user) {
      return res.status(404).json({ success: false, mes: "user not fund" });
    }
    res.json({ success: true, msg: "user deleted" });
  } catch (error) {
    res.status(500).json({ success: false, msg: "server error" });
  }
};
// delete user function end
const logout = (req, res) => {
  try {
    req.session.destroy();
    res.json({ success: true, msg: "session destroyed" });
  } catch (error) {
    res.json({ success: false, msg: "faild to destroy swssion" });
  }
};
module.exports = {
  get_all_users,
  add_user,
  get_one_user,
  update_user,
  delete_user,
  login_user,
  logout,
};
