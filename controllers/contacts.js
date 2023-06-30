const { Contact, addSchema } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const getListContacts = async (req, res) => {
  // find - знаходить і повертає всі об'єкти з колекції
  const result = await Contact.find(); 
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findOne({_id: contactId});
  // const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Contact not found"); // створили об'єкт помилки
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  // валідація, якщо все добре error = undefined
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

// const removeContact = async (req, res) => {
//   const { contactId } = req.params;
//   const result = await contacts.removeContact(contactId);
//   if (!result) {
//     throw HttpError(404, "Contact not found"); // створили об'єкт помилки
//   }
//   res.json(result);
// };

// const updateById = async (req, res, next) => {
//   try {
//     const { error } = addSchema.validate(req.body);
//     // валідація, якщо все добре error = undefined
//     if (error) {
//       throw HttpError(400, error.message);
//     }
//     const { contactId } = req.params;
//     const result = await contacts.updateById(contactId, req.body);
//     if (!result) {
//       throw HttpError(404, "Contact not found"); // створили об'єкт помилки
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = {
  getListContacts: ctrlWrapper(getListContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  // removeContact: ctrlWrapper(removeContact),
  // updateById, // для прикладу залишив першочерговий стан
};
