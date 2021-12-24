import db from './db'
import { ObjectId } from 'mongodb'  // дописали флаг -r dotenv/config   в файл  package.json в скрипте "start:dev" и "start" 


const getCollection = async (db, name) =>{
  const client = await db;
  const collection = await client.db().collection('contacts');
  console.log ("!!! collection = ", collection);
  return collection;
}

const listContacts = async () => {
// const client = await db;
// const collection = await client.db().collection('contacts');
// console.log ("!!! collection = ", collection);
const collection = await  getCollection (db, 'contacts')
const result = await collection.find().toArray()
return result;
  }
  
 const getContactById= async (contactId) => {
    const collection = await  getCollection (db, 'contacts')
    const id= ObjectId(contactId);//в MongoDB мы не можем передавать id просто как строку. Его нужно преобразовать в класс ObjectId

    const [result] = await collection.find({_id: id}).toArray() //квадратные скобкиб т.к. приходит массив
    return result;
    
  }
  
  const removeContact = async (contactId ) => {
    const collection = await  getCollection (db, 'contacts')
    const id= ObjectId(contactId);//в MongoDB мы не можем передавать id просто как строку. Его нужно преобразовать в класс ObjectId

    // const result = await collection.findOneAndDelete({_id: id})
    const { value: result } = await collection.findOneAndDelete({_id: id})
    return result;
  }
  
  // const addContact =  async ({name, email, phone}) => {
const addContact =  async (body) => {
    const collection = await  getCollection (db, 'contacts');
    const newContact = {
      favorite: false,
      ...body
    }
    const result = await collection.insertOne (newContact);
    return result;
  }

  const updateContact =  async (contactId, body) => {
    const collection = await  getCollection (db, 'contacts')
    const id= ObjectId(contactId);//в MongoDB мы не можем передавать id просто как строку. Его нужно преобразовать в класс ObjectId
    const { value: result } = await collection.findOneAndUpdate({_id: id}, {$set: body}) //ВАЖНО не упустить модификатор $set б иначе всё перезатрёт
    return result;
  }
  

export default {listContacts, getContactById, removeContact, addContact, updateContact}


