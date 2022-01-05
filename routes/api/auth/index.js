import {Router} from "express";

import {registration, login, logout} from '../../../controllers/auth';
import guard from '../../../middlewares/guard';

// import pkg from 'mongoose' ;
// import repositoryContacts from '../../../repository/contacts'

const router = new Router()

router.post('/signup', registration)

router.post('/login', login)

router.post('/logout', guard, logout)

// router.post('/current', )



export default router;