const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { BASE_URL } = process.env;
const { BASE_EMAIL } = process.env;
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const imageSize = require("../helpers/imgHelpers");

const {
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
} = require("../models/users");

const registrationAction = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email);

    if (user) {
      return res.status(409).json({
        message: "Email in use",
      });
    }
    const verificationToken = uuidv4();

    const newUser = await registerUser(email, password, verificationToken);

    const msg = {
      to: email,
      from: BASE_EMAIL,
      subject: "Verification email",
      text: "Thank you for registration. Verificate your email",
      html: `<a href="${BASE_URL}/api/users/verify/${verificationToken}" target="_blank">Click to confirm registration</a>`,
    };
    await sgMail.send(msg);

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
      return res.status(401).json({ message: "User not found" });
    }

    if (!user.verify) {
      return res
        .status(404)
        .json({ message: "Verification has not been passed yet" });
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
  try {
    return res.status(200).json({
      user: { email: req.user.email, subscription: req.user.subscription },
    });
  } catch (error) {
    next(error.message);
  }
};

const updateSubscriptionAction = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { subscription } = req.body;

    const updateUserSubscription = await updateSubscription(
      subscription,
      owner
    );
    if (!updateUserSubscription) {
      return res.status(400).json({ message: "Missing field subscription" });
    }
    return res.status(200).json({ message: "Contact was updated" });
  } catch (error) {
    next(error.message);
  }
};

const avatarDir = path.join(__dirname, "../", "public", "avatars");

const updateAvatarAction = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { path: tempUpload, originalname } = req.file;
    if (!req.file) {
      return res.status(401).json({ message: "Please upload a file" });
    }

    const filename = `${owner}_${originalname}`;
    const resultUpload = path.join(avatarDir, filename);
    await fs.rename(tempUpload, resultUpload);
    await imageSize(resultUpload);

    const avatarUrl = path.join("avatars", filename);
    const updateUserAvatar = await updateAvatar(avatarUrl, owner);
    if (!updateUserAvatar) {
      return res.status(401).json({ message: "Not authorized" });
    }
    return res.status(200).json({ avatarUrl: avatarUrl });
  } catch (error) {
    next(error.message);
  }
};

const verifyEmailAction = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;

    const user = await findUserByVerificationToken(verificationToken);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verify) {
      return res.status(200).json({ message: "User already verified" });
    }

    await verifyUser(user._id);
    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    next(error.message);
  }
};

const resendVerifyEmailAction = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Missing required field email" });
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verify) {
      return res
        .status(400)
        .json({ message: "Verification has already been passed" });
    }

    const msg = {
      to: email,
      from: BASE_EMAIL,
      subject: "Verification email",
      text: "Thank you for registration. Verificate your email",
      html: `<a href="${BASE_URL}/api/users/verify/${user.verificationToken}" target="_blank">Click to confirm registration</a>`,
    };
    await sgMail.send(msg);

    return res.status(200).json({ message: "Verification email sent" });
  } catch (error) {
    next(error.message);
  }
};

module.exports = {
  registrationAction,
  loginAction,
  logoutAction,
  getCurrentUserAction,
  updateSubscriptionAction,
  updateAvatarAction,
  verifyEmailAction,
  resendVerifyEmailAction,
};
