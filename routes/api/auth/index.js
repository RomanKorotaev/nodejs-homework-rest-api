import {Router} from "express";
import pkg from 'mongoose'

// import repositoryContacts from '../../../repository/contacts'


// // !!!!
// import ... from '../../../controllers/auth'

// import  {validateCreate, validateUpdate, validateId, updateStatusContact} from './validation'


const router = new Router()


// router.post('/', validateCreate, async (req, res, next) => { 
router.post('/signup', async (req, res, next) => { 
//   const newContact = await repositoryContacts.addContact(req.body); 
//   res.status(201).json(newContact)
})

router.post('/login', async (req, res, next) => { 
    // const newContact = await repositoryContacts.addContact(req.body); 
    // res.status(201).json(newContact)
  })

  router.post('/logout', async (req, res, next) => { 
    // const newContact = await repositoryContacts.addContact(req.body); 
    // res.status(201).json(newContact)
  })

  router.post('/current', async (req, res, next) => { 
    // const newContact = await repositoryContacts.addContact(req.body); 
    // res.status(201).json(newContact)
  })



export default router;