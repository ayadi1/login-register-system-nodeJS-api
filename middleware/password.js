const bcrypt = require("bcrypt");
const saltRound = 10;

const hash_password = (password) => {
  const hashed_password = bcrypt.hashSync(password, saltRound);
  return hashed_password;
};
const password_checker = (testPassword, hash) => {
  const password = bcrypt.compareSync(testPassword, hash);
  return password;
};
module.exports = { hash_password, password_checker };
