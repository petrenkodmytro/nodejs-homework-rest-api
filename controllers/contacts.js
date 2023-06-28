const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");
const Joi = require("joi");

// опис вимог до об'єктів (зразок proptypes)
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const getListContacts = async (req, res) => {
  const result = await contacts.getListContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
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
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Contact not found"); // створили об'єкт помилки
  }
  res.json(result);
};

const updateById = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    // валідація, якщо все добре error = undefined
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contacts.updateById(contactId, req.body);
    if (!result) {
      throw HttpError(404, "Contact not found"); // створили об'єкт помилки
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getListContacts: ctrlWrapper(getListContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateById, // для прикладу залишив першочерговий стан
};
