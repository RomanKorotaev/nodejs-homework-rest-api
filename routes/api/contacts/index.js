import {Router} from "express";
import { getContacts,
        getContactById,
        addContact,
        removeContact,
        updateContact 
    } from '../../../controllers/contacts/index'

import  {validateCreate,
        validateUpdate,
        validateId,
        updateStatusContact,
        validateQuery
    } from './validation'


import guard from '../../../middlewares/guard'

const router = new Router()

router.get('/', [guard, validateQuery], getContacts)

router.get('/:id', [guard, validateId], getContactById)

router.post('/', [guard, validateCreate],  addContact)

router.delete('/:id', [guard, validateId], removeContact)

router.put('/:id', [guard, validateUpdate, validateId], updateContact)

router.patch('/:id/favorite', [guard, validateId, updateStatusContact], updateContact)


export default router;