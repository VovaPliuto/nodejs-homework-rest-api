import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("models", "contacts.json");
const updateContactsData = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find((el) => el.id === contactId);
  console.log(contactById);
  return contactById || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((el) => el.id === contactId);
  if (index === -1) {
    return;
  }
  const [removedContact] = contacts.splice(index, 1);
  updateContactsData(contacts);
  return removedContact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContact);
  updateContactsData(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((el) => el.id === contactId);
  if (index === -1) {
    return;
  }
  contacts[index] = {
    id: contactId,
    ...body,
  };
  updateContactsData(contacts);
  return contacts[index];
};

const contactsAPI = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

export default contactsAPI;
