const { User } = require("../db/userModel");
const gravatar = require("gravatar");

const registerUser = async (email, password, verificationToken) => {
  const avatarURL = gravatar.url(email);
  const user = await new User({
    email,
    password,
    avatarURL,
    verificationToken,
  });
  return user.save();
};

const loginUser = async (email) => {
  return await User.findOne({ email });
};

const getUserById = async (_id) => {
  return await User.findOne({ _id });
};

const getUserByEmail = async (email) => {
  return await User.findOne({ email });
};

const saveToken = async (_id, token) => {
  return await User.findByIdAndUpdate(_id, {
    $set: { token },
    runValidators: true,
  });
};

const removeToken = async (_id) => {
  return await User.findByIdAndUpdate(_id, {
    $set: { token: null },
    runValidators: true,
  });
};

const updateSubscription = async (subscription, owner) => {
  return await User.findByIdAndUpdate(owner, {
    $set: { subscription },
    runValidators: true,
  });
};

const updateAvatar = async (avatarUrl, owner) => {
  return await User.findByIdAndUpdate(owner, {
    avatarUrl,
  });
};

const findUserByVerificationToken = async (verificationToken) => {
  return await User.findOne({ verificationToken });
};

const verifyUser = async (userId) => {
  return await User.findByIdAndUpdate(userId, {
    $set: { verify: true, verificationToken: null },
    runValidators: true,
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  getUserByEmail,
  saveToken,
  removeToken,
  updateSubscription,
  updateAvatar,
  findUserByVerificationToken,
  verifyUser,
};
