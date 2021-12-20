import contacts from '../db/contacts.json'

 const getContactById= async (contactId) => {
    // const contacts = await readContent();
    const [contact] = contacts.filter ((contact)=> contact.id===contactId)
    return contact;
    
  }

  export default getContactById;