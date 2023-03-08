const express = require("express");

const router = express.Router();

const {
  registerNewUserValidation,
  loginValidation,
} = require("../../middleware/validation");

const { authMiddleware } = require("../../middleware/authMiddleware");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  registrationAction,
  loginAction,
  logoutAction,
  getCurrentUserAction,
} = require("../../controllers/authControllers");

router.post(
  "/users/register",
  registerNewUserValidation,
  asyncWrapper(registrationAction)
);
router.post("/users/login", loginValidation, asyncWrapper(loginAction));
router.post("/users/logout", authMiddleware, asyncWrapper(logoutAction));
router.get(
  "/users/current",
  authMiddleware,
  asyncWrapper(getCurrentUserAction)
);

module.exports = router;
