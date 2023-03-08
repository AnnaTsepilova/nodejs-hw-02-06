const express = require("express");

const router = express.Router();

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  registrationAction,
  loginAction,
} = require("../../controllers/authControllers");

router.post("/users/register", asyncWrapper(registrationAction));
router.post("/users/login", asyncWrapper(loginAction));

module.exports = router;
