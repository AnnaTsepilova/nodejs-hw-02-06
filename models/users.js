const { User } = require("../db/userModel");
const gravatar = require("gravatar");

const registerUser = async (email, password) => {
  const avatarURL = gravatar.url(email);
  const user = await new User({
    email,
    password,
    avatarURL,
  });
  return user.save();
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  return user;
};

const getUserById = async (_id) => {
  const user = await User.findOne({ _id });
  return user;
};

const saveToken = async (_id, token) => {
  return User.findByIdAndUpdate(_id, {
    $set: { token },
    runValidators: true,
  });
};

const removeToken = async (_id) => {
  return User.findByIdAndUpdate(_id, {
    $set: { token: null },
    runValidators: true,
  });
};

const updateSubscription = async (subscription, owner) => {
  return User.findByIdAndUpdate(owner, {
    $set: { subscription },
    runValidators: true,
  });
};

const updateAvatar = async (avatarUrl, owner) => {
  return User.findByIdAndUpdate(owner, {
    avatarUrl,
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  saveToken,
  removeToken,
  updateSubscription,
  updateAvatar,
};
