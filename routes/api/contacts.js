const express = require("express");

const router = express.Router();

const {
  addContactValidation,
  updateContactValidation,
  updateStatusContactValidation,
} = require("../../middleware/validation");

const {
  getContactsListAction,
  getContactByIdAction,
  addContactAction,
  removeContactAction,
  updateContactAction,
  updateStatusContactAction,
} = require("../../controllers/contactController");

router.get("/", getContactsListAction);
router.get("/:contactId", getContactByIdAction);
router.post("/", addContactValidation, addContactAction);
router.delete("/:contactId", removeContactAction);
router.put("/:contactId", updateContactValidation, updateContactAction);
router.patch(
  "/:contactId/favorite",
  updateStatusContactValidation,
  updateStatusContactAction
);

module.exports = router;
