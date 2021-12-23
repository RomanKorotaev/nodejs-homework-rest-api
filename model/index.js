
import db from './db'

const listContacts = async () => {
const client = await db;
const collection = await client.db().collection('contacts');
console.log ("!!! collection = ", collection);
const result = await collection.find().toArray()
return result;
  }
  
 const getContactById= async (contactId) => {
    const client = await db;
    const collection = await client.db().collection('contacts');
    console.log ("!!! collection = ", collection);
    const [result] = await collection.find({_id: contactId}).toArray() //квадратные скобкиб т.к. приходит массив
    return result;
    
  }
  
  const removeContact = async (contactId ) => {

  }
  
  const addContact =  async ({name, email, phone}) => {

  }

  const updateContact =  async (contactId, body) => {

  }

export default {listContacts, getContactById, removeContact, addContact, updateContact}


