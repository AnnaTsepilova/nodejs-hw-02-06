const express = require("express");

const router = express.Router();

const {
  addContactValidation,
  updateContactValidation,
  updateStatusContactValidation,
  objectIdValidation,
} = require("../../middleware/validation");

const { authMiddleware } = require("../../middleware/authMiddleware");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  getContactsListAction,
  getContactByIdAction,
  addContactAction,
  removeContactAction,
  updateContactAction,
  updateStatusContactAction,
} = require("../../controllers/contactControllers");

router.use(authMiddleware);
router.get("/", asyncWrapper(getContactsListAction));
router.get(
  "/:contactId",
  objectIdValidation,
  asyncWrapper(getContactByIdAction)
);
router.post("/", addContactValidation, asyncWrapper(addContactAction));
router.delete(
  "/:contactId",
  objectIdValidation,
  asyncWrapper(removeContactAction)
);
router.put(
  "/:contactId",
  objectIdValidation,
  updateContactValidation,
  asyncWrapper(updateContactAction)
);
router.patch(
  "/:contactId/favorite",
  objectIdValidation,
  updateStatusContactValidation,
  asyncWrapper(updateStatusContactAction)
);

module.exports = router;
