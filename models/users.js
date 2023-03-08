const { User } = require("../db/userModel");

const registerUser = async (email, password) => {
  const user = await new User({
    email,
    password,
  });
  return user.save();
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  return user;
};

module.exports = {
  registerUser,
  loginUser,
};
