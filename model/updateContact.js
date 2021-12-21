import contacts from '../db/contacts.json'

import fs from 'fs/promises';
import path from 'path';

import {fileURLToPath} from 'url';
import { resourceLimits } from 'worker_threads';
const __dirname = path.dirname(fileURLToPath(import.meta.url))


const contactsPath = path.join(__dirname, '../', '/db', 'contacts.json');
// console.log ('contactsPath =', contactsPath );
// console.log ('__dirname =', __dirname );



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

export default updateContact;