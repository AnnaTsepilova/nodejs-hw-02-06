const { Contact } = require("../db/contactModel");

const listContacts = async (owner, favorite, { skipAmount, limit }) => {
  const queryObject = { owner: owner };
  if (favorite) {
    queryObject.favorite = favorite === "true";
  }

  const contactsList = await Contact.find(queryObject)
    .skip(skipAmount)
    .limit(limit);
  return contactsList;
};

const getContactById = async (contactId, owner) => {
  return await Contact.findById(contactId, owner);
};

const removeContact = async (contactId, owner) => {
  return await Contact.findOneAndRemove(contactId, owner);
};

const addContact = async (body, owner) => {
  const { name, email, phone } = body;
  return await Contact.create({ owner, name, email, phone });
};

const updateContact = async (contactId, body, owner) => {
  const { name, email, phone } = body;
  return await Contact.findOneAndUpdate(
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
  return await Contact.findByIdAndUpdate(
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
