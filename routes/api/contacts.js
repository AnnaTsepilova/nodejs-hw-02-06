const express = require("express");

const router = express.Router();

const Joi = require("joi");

const contactSchemaValid = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().required(),
});

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contactsList = await listContacts();
    console.log("contactsList in router get", contactsList);
    return res.status(200).json(contactsList);
  } catch (error) {
    next(error.message);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactById = await getContactById(req.params.contactId);
    if (!contactById) {
      res.status(404).res.json({ message: "Not found" });
      return;
    }
    return res.status(200).json(contactById);
  } catch (error) {
    next(error.message);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const validError = contactSchemaValid.validate(req.body);
    if (validError.error) {
      return res.status(400).json({ message: "missing required fields" });
    }

    const newContact = await addContact({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    });
    return res.status(201).json(newContact);
  } catch (error) {
    next(error.message);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contactById = await removeContact(req.params.contactId);
    if (!contactById) {
      res.status(404).res.json({ message: "Not found" });
      return;
    }
    return res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error.message);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const validError = contactSchemaValid.validate(req.body);
    if (validError.error) {
      return res.status(400).json({ message: validError.error });
    }

    const updatedContact = await updateContact(req.params.contactId, req.body);
    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(updatedContact);
  } catch (error) {
    next(error.message);
  }
});

module.exports = router;
