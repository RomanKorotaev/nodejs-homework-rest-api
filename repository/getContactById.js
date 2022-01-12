import Contact from '../model/contact'


const getContactById= async (userId, contactId) => {
  const result = await Contact.findOne({ _id: contactId, owner: userId });
  return result;
}


export default getContactById;