import Contact from '../model/contact'

const updateContact =  async (contactId, body) => {
  // const collection = await  getCollection (db, 'contacts')
  // const id= ObjectId(contactId);//в MongoDB мы не можем передавать id просто как строку. Его нужно преобразовать в класс ObjectId
  
  const result = await Contact.findByIdAndUpdate(
    contactId,
    {...body},
    {new: true},
     ) 
  return result;
}

export default updateContact;