import contacts from '../db/contacts.json'

import fs from 'fs/promises';
import path from 'path';

import {fileURLToPath} from 'url';
import { resourceLimits } from 'worker_threads';
const __dirname = path.dirname(fileURLToPath(import.meta.url))


const contactsPath = path.join(__dirname, '../', '/db', 'contacts.json');

// console.log ('contactsPath =', contactsPath );
// console.log ('__dirname =', __dirname );



const removeContact = async (contactId ) => {
    const index =contacts.findIndex( (contact)=> contact.id===contactId )
      if (index!==-1) {
        const result = contacts.splice(index, 1)
        await fs.writeFile (contactsPath, JSON.stringify (contacts , null, 2))
        return result;
      }
    return null;
  }
  export default removeContact;