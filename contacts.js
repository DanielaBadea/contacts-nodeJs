const fs = require('fs').promises;
const path = require('path');
const colors = require('colors');
// const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    console.table(contacts);
    return contacts;
  } catch (error) {
    console.error('Error reading contacts:', error);
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    const contactById = contacts.find(contact => contact.id === contactId);
    if (contactById) {
      console.table([contactById]);
      return contactById;
    } else {
      console.log(`Contact with id '${contactId}' not found.`.red);
      return null;
    }
  } catch (error) {
    console.error('Error reading contacts:', error);
    throw error;
  }
}

async function removeContact(contactId) {
  try {
    let data = await fs.readFile(contactsPath, 'utf-8');
    let contacts = JSON.parse(data);
    const index = contacts.findIndex(contact => contact.id === contactId);
    if (index > -1) {
      contacts.splice(index, 1);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      console.log(`Contact with id '${contactId}' has been removed successfully.`.blue);
    } else {
      console.log(`Contact with id '${contactId}' not found.`.red);
    }
  } catch (error) {
    console.error(`Error removing contact ${contactId}:`, error);
    throw error;
  }
}
// let id = 0;
async function addContact(name, email, phone) {
  try {
    let data = await fs.readFile(contactsPath, 'utf-8');
    let contacts = JSON.parse(data);

    const duplicate =  contacts.find(contact => contact.name === name);
    if (duplicate) {
      console.log(`Contact with name '${name}' already exists.`.red);
      return;
    }

    const newContact = {
      // id: nanoid(),
      // id:id++,
      name,
      email,
      phone
    };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log('New contact has been added successfully:'.blue);
    console.table([newContact]);
  } catch (error) {
    console.error('Error adding new contact:', error);
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};
