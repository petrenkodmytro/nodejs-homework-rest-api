const fs = require("fs/promises");

const { nanoid } = require("nanoid");
// path - пакет вбудований в Node.js для створення шляхів, нормалізує шлях
const path = require("path");
// __dirname - абсолютний шлях до папки
const contactsPath = path.join(__dirname, "contacts.json");

const getListContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const allContacts = await getListContacts();
  const result = allContacts.find((item) => item.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const allContacts = await getListContacts();
  const index = allContacts.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }

  // деструктуризація массиву, що повертає splice
  const [result] = allContacts.splice(index, 1);
  // повністю перезаписуємо файл
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return result;
};

const addContact = async (data) => {
  const allContacts = await getListContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  allContacts.push(newContact);
  // перезаписуємо JSON
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};

const updateById = async (contactId, data) => {
  const allContacts = await getListContacts();
  const index = allContacts.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }

  allContacts[index] = { id: contactId, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return allContacts[index];
};

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
};
