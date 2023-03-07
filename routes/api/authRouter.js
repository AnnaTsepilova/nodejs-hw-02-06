const express = require("express");

const router = express.Router();

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  registrationAction,
  loginAction,
} = require("../../controllers/authControllers");

// const {
//   getContactsListAction,
//   getContactByIdAction,
//   addContactAction,
//   removeContactAction,
//   updateContactAction,
//   updateStatusContactAction,
// } = require("../../controllers/contactControllers");

router.post("/users/register", asyncWrapper(registrationAction));
router.post("/users/login", asyncWrapper(loginAction));

// router.get("/", asyncWrapper(getContactsListAction));
// router.get(
//   "/:contactId",

//   asyncWrapper(getContactByIdAction)
// );
// router.post("/", asyncWrapper(addContactAction));
// router.delete(
//   "/:contactId",

//   asyncWrapper(removeContactAction)
// );
// router.put(
//   "/:contactId",

//   asyncWrapper(updateContactAction)
// );
// router.patch(
//   "/:contactId/favorite",

//   asyncWrapper(updateStatusContactAction)
// );

module.exports = router;
