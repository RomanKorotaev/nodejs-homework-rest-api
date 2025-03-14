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
import  wrapperError  from '../../../middlewares/error-handler'

const router = new Router()

router.get('/', [guard, validateQuery], wrapperError( getContacts) )

router.get('/:id', [guard, validateId], wrapperError( getContactById) )

router.post('/', [guard, validateCreate],  wrapperError( addContact) )

router.delete('/:id', [guard, validateId], wrapperError( removeContact) )

router.put('/:id', [guard, validateUpdate, validateId], wrapperError( updateContact) )

router.patch('/:id/favorite', [guard, validateId, updateStatusContact], wrapperError( updateContact) )


export default router;