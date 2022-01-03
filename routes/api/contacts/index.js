import {Router} from "express";
import { getContacts, getContactById, addContact,  removeContact, updateContact } from '../../../controllers/contacts/index'

import  {validateCreate, validateUpdate, validateId, updateStatusContact} from './validation'


const router = new Router()

router.get('/', getContacts)

router.get('/:id', validateId, getContactById)

router.post('/', validateCreate,  addContact)

router.delete('/:id', validateId, removeContact)

router.put('/:id', validateUpdate, validateId, updateContact)

router.patch('/:id/favorite', validateId, updateStatusContact, updateContact)



export default router;