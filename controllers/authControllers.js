const {
  registerUser,
  loginUser,
  getUserById,
  saveToken,
  removeToken,
} = require("../models/users");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registrationAction = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email);
    if (user) {
      return res.status(409).json({
        message: "Email in use",
      });
    }

    const newUser = await registerUser(email, password);
    return res.status(201).json({
      user: newUser,
    });
  } catch (error) {
    next(error.message);
  }
};

const loginAction = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email);

    if (!user) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Email or password is wrong" });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.JWT_SECRET
    );

    saveToken(user._id, token);

    return res.status(200).json({
      token: token,
      user: { email: user.email, subscription: user.subscription },
    });
  } catch (error) {
    next(error.message);
  }
};

const logoutAction = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await getUserById(_id);

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await removeToken(_id);
    return res.status(204).json();
  } catch (error) {
    next(error.message);
  }
};

const getCurrentUserAction = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const user = await getUserById(_id);

    if (!user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    return res
      .status(200)
      .json({ email: user.email, subscription: user.subscription });
  } catch (error) {
    next(error.message);
  }
};

module.exports = {
  registrationAction,
  loginAction,
  logoutAction,
  getCurrentUserAction,
};
