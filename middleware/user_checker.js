const UserModule = require("../models/userModule");

const check_if_user_existe = async (email) => {
  try {
    const user = await UserModule.find({ email });
    if (user.length > 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    return false;
  }
};

module.exports = { check_if_user_existe };
