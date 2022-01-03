// import contacts from '../db/contacts.json'

// const listContacts = async () => {
//     return await contacts;
//   }

//   export default listContacts;

import Contact from '../model/contact'

const listContacts = async () => {
  const result = await Contact.find()
  return result;
    }

export default listContacts;