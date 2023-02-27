// const { connectMongo } = require("../db/connection");
// const ObjectId = require("mongodb").ObjectId;

const { Contact } = require("../db/contactModel");

// by MongoDB driver
// const listContacts = async () => {
//   try {
//     const Contacts = await connectMongo();
//     const contactsList = await Contacts.find({}).toArray();
//     return contactsList;
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// by Mongoose
const listContacts = async () => {
  const contactsList = await Contact.find({});
  return contactsList;
};

const getContactById = async (contactId) => {
  try {
    // const Contacts = await connectMongo();
    // const contactById = Contacts.findOne({
    //   _id: new ObjectId(contactId),
    // });
    // return contactById;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    // const Contacts = await connectMongo();
    // await Contacts.findOneAndDelete({ _id: new ObjectId(contactId) });
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    // const Contacts = await connectMongo();
    // const newContact = Contacts.insertOne({
    //   _id: new ObjectId(),
    //   name: body.name,
    //   email: body.email,
    //   phone: body.phone,
    //   favorite: false,
    // });
    // return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    // const Contacts = await connectMongo();
    // const updatedContact = await Contacts.findOneAndUpdate(
    //   { _id: new ObjectId(contactId) },
    //   {
    //     $set: {
    //       name: body.name,
    //       email: body.email,
    //       phone: body.phone,
    //     },
    //   },
    //   { returnDocument: "after" }
    // );
    // return updatedContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateStatusContact = async (contactId, body) => {
  try {
    // const Contacts = await connectMongo();
    // const updatedStatusContact = await Contacts.findOneAndUpdate(
    //   { _id: new ObjectId(contactId) },
    //   {
    //     $set: {
    //       favorite: body.favorite,
    //     },
    //   },
    //   { returnDocument: "after" }
    // );
    // return updatedStatusContact;
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
  updateStatusContact,
};
