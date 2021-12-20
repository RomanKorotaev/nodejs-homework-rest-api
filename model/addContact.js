import contacts from '../db/contacts.json'

import fs from 'fs/promises';
import path from 'path';
import {randomUUID} from 'crypto';

import {fileURLToPath} from 'url';
import { resourceLimits } from 'worker_threads';
const __dirname = path.dirname(fileURLToPath(import.meta.url))


const contactsPath = path.join(__dirname, '../', '/db', 'contacts.json');

// console.log ('contactsPath =', contactsPath );
// console.log ('__dirname =', __dirname );



const addContact =  async ({name, email, phone}) => {
    const newContact = { name, email, phone, id: randomUUID() }
    contacts.push (newContact);
    await fs.writeFile (contactsPath, JSON.stringify (contacts, null, 2))

    return newContact;
  }

export default addContact;