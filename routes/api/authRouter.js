const express = require("express");

const router = express.Router();

const {
  registerNewUserValidation,
  loginValidation,
  subscriptionValidation,
  verifyValidation,
} = require("../../middleware/validation");

const { authMiddleware } = require("../../middleware/authMiddleware");
const upload = require("../../middleware/upload");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  registrationAction,
  loginAction,
  logoutAction,
  getCurrentUserAction,
  updateSubscriptionAction,
  addAvatarAction,
  updateAvatarAction,
  verifyEmailAction,
  resendVerifyEmailAction,
} = require("../../controllers/authControllers");

router.post(
  "/users/register",
  registerNewUserValidation,
  asyncWrapper(registrationAction)
);
router.post("/users/login", loginValidation, asyncWrapper(loginAction));
router.post("/users/logout", authMiddleware, asyncWrapper(logoutAction));
router.post("/users/avatar", authMiddleware, asyncWrapper(addAvatarAction));
router.get(
  "/users/current",
  authMiddleware,
  asyncWrapper(getCurrentUserAction)
);
router.patch(
  "/users",
  authMiddleware,
  subscriptionValidation,
  asyncWrapper(updateSubscriptionAction)
);
router.patch(
  "/users/avatars",
  authMiddleware,
  upload.single("avatar"),
  asyncWrapper(updateAvatarAction)
);
router.get(
  "/users/verify/:verificationToken",
  verifyValidation,
  asyncWrapper(verifyEmailAction)
);
router.post(
  "/users/verify",
  verifyValidation,
  asyncWrapper(resendVerifyEmailAction)
);

module.exports = router;
