import fs from 'fs/promises';
import path from 'path';
import {randomUUID} from 'crypto';
import contacts from './contacts.json'

import {fileURLToPath} from 'url';
import { resourceLimits } from 'worker_threads';
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const contactsPath = path.join(__dirname, "contacts.json");


const listContacts = async () => {
    return await contacts;
  }
  
 const getContactById= async (contactId) => {
    // const contacts = await readContent();
    const [contact] = contacts.filter ((contact)=> contact.id===contactId)
    return contact;
    
  }
  
  const removeContact = async (contactId ) => {
    const index =contacts.findIndex( (contact)=> contact.id===contactId )
    if (index!==-1) {
      const result = contacts.splice(index, 1)
      await fs.writeFile (contactsPath, JSON.stringify (contacts , null, 2))
      return result;
    }

    return null;
  }
  
  const addContact =  async ({name, email, phone}) => {
    const newContact = { name, email, phone, id: randomUUID() }
    contacts.push (newContact);
    await fs.writeFile (contactsPath, JSON.stringify (contacts, null, 2))

    return newContact;
  }

  const updateContact =  async (contactId, body) => {
    const index = contacts.findIndex ( (contact)=> contact.id===contactId );
     if (index!==-1) {
       const updatedContact = {id: contactId, ...contacts[index], ...body}
       contacts[index] = updatedContact;
       await fs.writeFile (contactsPath, JSON.stringify (contacts , null, 2))

       return updatedContact;
     }
     return null;
  }

export default {listContacts, getContactById, removeContact, addContact, updateContact}


