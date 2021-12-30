import {Router} from "express";
// import model from '../../../repository/contacts'
import repositoryContacts from '../../../repository/contacts'
import  {validateCreate, validateUpdate, validateId, updateStatusContact} from './validation'

const router = new Router()

router.get('/', async (req, res, next) => {
  const contacts = await repositoryContacts.listContacts();
  console.log("!!! contacts",contacts)
  res.status(200).json( contacts );
})

router.get('/:id', validateId, async (req, res, next) => {
  const {id} = req.params;
  const contact = await repositoryContacts.getContactById(id);
  console.log(contact); //toObject
  if (contact) {
    return res.status(200).json(contact) //toJSON
  } 
  res.status(404).json({ message: 'Not found! :-(' })
})

router.post('/', validateCreate, async (req, res, next) => { 
  const newContact = await repositoryContacts.addContact(req.body); 
  res.status(201).json(newContact)
})

router.delete('/:id', validateId, async (req, res, next) => {
  const {id} = req.params;
  const contact = await repositoryContacts.removeContact(id);
    if (contact) {
      console.log ("TEST: Contact deleted!!!")
      // return res.status(200).json({ message: 'Contact deleted.' })
      return res.status(200).json(contact)
    } 
  res.status(404).json({ message: 'Not found! :-(' })

})

router.put('/:id', validateUpdate, validateId, async (req, res, next) => {
  const {id} = req.params;
  const contact = await repositoryContacts.updateContact(id, req.body);
    if (contact ) {
      console.log ("TEST: Contact putted!")
      return res.status(200).json(contact)
    } 
  res.status(404).json({ message: 'Not found! :-(' })
})

router.patch('/:id/favorite', validateId, updateStatusContact, async (req, res, next) => {
  const {id} = req.params;
  const contact = await repositoryContacts.updateContact(id, req.body);
  // const contact = await repositoryContacts.updateStatusContact(id, req.body);
    if (contact ) {
      console.log ("TEST: Contact patched!")
      return res.status(200).json(contact)
    } 
  res.status(404).json({ message: 'Not found! :-(' })
})



export default router;