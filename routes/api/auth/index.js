import {Router} from "express";
import pkg from 'mongoose'
import {registration, login, logout} from '../../../controllers/auth'
// import repositoryContacts from '../../../repository/contacts'


const router = new Router()

router.post('/signup', registration)

router.post('/login', login)

router.post('/logout', logout)

// router.post('/current', )



export default router;