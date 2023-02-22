//const { Contact } = require("../db/contactModel");
const { connectMongo } = require("../db/connection");

const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.resolve("models/contacts.json");

const listContacts = async () => {
  try {
    const Contacts = await connectMongo();
    const contactsList = await Contacts.find({}).toArray();

    return contactsList;
  } catch (error) {
    console.log(error.message);
  }
  // const { Contacts } = await connectMongo();
  // const contactsList = await Contacts.find({});
  // res.json({ contactsList });
  //----------------------------------------
  // try {
  //   const contactsList = await fs.readFile(contactsPath, "utf8");
  //   return JSON.parse(contactsList);
  // } catch (error) {
  //   console.log(error.message);
  // }
};

const getContactById = async (contactId) => {
  try {
    const contactsList = await listContacts();
    const contactById = contactsList.filter(
      (contact) => contact.id === contactId
    );
    return contactById;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contactsList = await listContacts();
    const newContactsList = contactsList.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(
      contactsPath,
      JSON.stringify(newContactsList, null, "\t")
    );
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const contactsList = await listContacts();
    const contactNew = {
      id: uuidv4(),
      name: body.name,
      email: body.email,
      phone: body.phone,
    };
    const newContactsList = JSON.stringify(
      [...contactsList, contactNew],
      null,
      "\t"
    );

    await fs.writeFile(contactsPath, newContactsList);

    return newContactsList;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contactsList = await listContacts();
    const [contactById] = contactsList.filter(
      (contact) => contact.id === contactId
    );

    contactById.name = body.name;
    contactById.email = body.email;
    contactById.phone = body.phone;

    const newContactsList = JSON.stringify(contactsList, null, "\t");

    await fs.writeFile(contactsPath, newContactsList);

    return newContactsList;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
