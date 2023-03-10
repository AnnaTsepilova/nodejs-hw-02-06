const { Contact } = require("../db/contactModel");

const listContacts = async (owner, { skipAmount, limit }) => {
  const contactsList = await Contact.find({ owner })
    .skip(skipAmount)
    .limit(limit);
  return contactsList;
};

const getContactById = async (contactId, owner) => {
  return Contact.findById(contactId, owner);
};

const removeContact = async (contactId, owner) => {
  return Contact.findOneAndRemove(contactId, owner);
};

const addContact = async (body, owner) => {
  const { name, email, phone } = body;
  return Contact.create({ owner, name, email, phone });
};

const updateContact = async (contactId, body, owner) => {
  const { name, email, phone } = body;
  return Contact.findOneAndUpdate(
    contactId,
    {
      $set: { name, email, phone },
      runValidators: true,
    },
    owner
  );
};

const updateStatusContact = async (contactId, body, owner) => {
  const { favorite } = body;
  return Contact.findByIdAndUpdate(
    contactId,
    {
      $set: { favorite },
      runValidators: true,
    },
    owner
  );
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};
