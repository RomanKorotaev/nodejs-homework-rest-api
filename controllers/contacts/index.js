import repositoryContacts from '../../repository/contacts'
import {HttpCode} from '../../lib/constants'


// router.get('/', async (req, res, next) => {
//     const contacts = await repositoryContacts.listContacts();
//     console.log("!!! contacts",contacts)
//     res.status(200).json( contacts );
//   })
    const getContacts = async (req, res, next) => {
      console.log ("req.query = ", req.query);
      console.log ("req.body = ", req.body)
      
      const {id: userId} = req.user
    const contacts = await repositoryContacts.listContacts(userId, req.query);
    // console.log("!!! contacts",contacts)
    // res.status(200).json( contacts );
    res.status(HttpCode.OK).json( {status: 'success', code: HttpCode.OK, data : {...contacts} } );
  }

  
//   router.get('/:id', validateId, async (req, res, next) => {
//     const {id} = req.params;
//     const contact = await repositoryContacts.getContactById(id);
//     console.log(contact); //toObject
//     if (contact) {
//       return res.status(200).json(contact) //toJSON
//     } 
//     res.status(404).json({ message: 'Not found! :-(' })
//   })
  const getContactById = async (req, res, next) => {
    const {id} = req.params;
    const {id: userId} = req.user;
    const contact = await repositoryContacts.getContactById(userId, id);
    console.log(contact); //toObject
    if (contact) {
      return res.status(HttpCode.OK).json({status: 'success', code: HttpCode.OK, data : {contact} }) //toJSON
    } 
    res.status(HttpCode.NOT_FOUND).json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found! :-(' })
  }
  
//   router.post('/', validateCreate, async (req, res, next) => { 
//     const newContact = await repositoryContacts.addContact(req.body); 
//     res.status(201).json(newContact)
//   })
const addContact = async (req, res, next) => {
  const {id: userId} = req.user; 
    const newContact = await repositoryContacts.addContact(userId, req.body); 
    res.status(HttpCode.CREATED).json({status: 'success', code: HttpCode.CREATED, data : {contact: newContact} })
  }
  

//   router.delete('/:id', validateId, async (req, res, next) => {
//     const {id} = req.params;
//     const contact = await repositoryContacts.removeContact(id);
//       if (contact) {
//         console.log ("TEST: Contact deleted!!!")
//         // return res.status(200).json({ message: 'Contact deleted.' })
//         return res.status(200).json(contact)
//       } 
//     res.status(404).json({ message: 'Not found! :-(' })
  
//   })
const removeContact = async (req, res, next) => {
    const {id} = req.params;
    const {id: userId} = req.user;
    const contact = await repositoryContacts.removeContact(userId, id);
      if (contact) {
        console.log ("TEST: Contact deleted!!!")
        // return res.status(200).json({ message: 'Contact deleted.' })
        return res.status(HttpCode.OK).json({status: 'success', code: HttpCode.OK, data : {contact} });
      } 
      res.status(HttpCode.NOT_FOUND).json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found! :-(' })
  
  }

  
//   router.put('/:id', validateUpdate, validateId, async (req, res, next) => {
//     const {id} = req.params;
//     const contact = await repositoryContacts.updateContact(id, req.body);
//       if (contact ) {
//         console.log ("TEST: Contact putted!")
//         return res.status(200).json(contact)
//       } 
//     res.status(404).json({ message: 'Not found! :-(' })
//   })
const updateContact = async (req, res, next) => {
    const {id} = req.params;
    const {id: userId} = req.user;
    const contact = await repositoryContacts.updateContact(userId, id, req.body);
      if (contact ) {
        console.log ("TEST: Contact putted!")
        return res.status(HttpCode.OK).json({status: 'success', code: HttpCode.OK, data : {contact} });
      } 
      res.status(HttpCode.NOT_FOUND).json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found! :-(' })
  }
  


//   router.patch('/:id/favorite', validateId, updateStatusContact, async (req, res, next) => {
//     const {id} = req.params;
//     const contact = await repositoryContacts.updateContact(id, req.body);
//     // const contact = await repositoryContacts.updateStatusContact(id, req.body);
//       if (contact ) {
//         console.log ("TEST: Contact patched!")
//         return res.status(200).json(contact)
//       } 
//     res.status(404).json({ message: 'Not found! :-(' })
//   })
// const updateContact = async (req, res, next) => {
//     const {id} = req.params;
//     const contact = await repositoryContacts.updateContact(id, req.body);
//     // const contact = await repositoryContacts.updateStatusContact(id, req.body);
//       if (contact ) {
//         console.log ("TEST: Contact patched!")
//         return res.status(200).json(contact)
//       } 
//     res.status(404).json({ message: 'Not found! :-(' })
//   }

export {getContacts, getContactById, addContact,  removeContact, updateContact }
  
  