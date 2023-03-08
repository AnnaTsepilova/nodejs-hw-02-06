const { registerUser, loginUser } = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registrationAction = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const newUser = await registerUser(email, password);
    return res.status(201).json(newUser);
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

    return res.status(200).json({ token: token });
  } catch (error) {
    next(error.message);
  }
};

module.exports = {
  registrationAction,
  loginAction,
};
