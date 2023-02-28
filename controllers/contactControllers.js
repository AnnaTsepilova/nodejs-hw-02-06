const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../models/contacts");

const getContactsListAction = async (req, res, next) => {
  try {
    const contactsList = await listContacts();
    return res.status(200).json(contactsList);
  } catch (error) {
    next(error.message);
  }
};

const getContactByIdAction = async (req, res, next) => {
  try {
    const contactById = await getContactById(req.params.contactId);
    if (!contactById) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    return res.status(200).json(contactById);
  } catch (error) {
    next(error.message);
  }
};

const addContactAction = async (req, res, next) => {
  try {
    const newContact = await addContact({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      favorite: false,
    });
    return res.status(201).json(newContact);
  } catch (error) {
    next(error.message);
  }
};

const removeContactAction = async (req, res, next) => {
  try {
    const contactById = await getContactById(req.params.contactId);

    if (!contactById) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    await removeContact(req.params.contactId);
    return res.status(200).json({ message: "Contact was deleted" });
  } catch (error) {
    next(error.message);
  }
};

const updateContactAction = async (req, res, next) => {
  try {
    const updatedContact = await updateContact(req.params.contactId, req.body);
    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json({ message: "Contact was updated" });
  } catch (error) {
    next(error.message);
  }
};

const updateStatusContactAction = async (req, res, next) => {
  try {
    const updatedStatusContact = await updateStatusContact(
      req.params.contactId,
      req.body
    );
    if (!updatedStatusContact) {
      return res.status(400).json({ message: "Missing field favorite" });
    }
    return res.status(200).json({ message: "Contact was updated" });
  } catch (error) {
    next(error.message);
  }
};

module.exports = {
  getContactsListAction,
  getContactByIdAction,
  addContactAction,
  removeContactAction,
  updateContactAction,
  updateStatusContactAction,
};
