import {Router} from "express";

import {registration, login, logout, current} from '../../../controllers/auth';
import guard from '../../../middlewares/guard';
import limiter from '../../../middlewares/rate-limit';

// import pkg from 'mongoose' ;
// import repositoryContacts from '../../../repository/contacts'

const router = new Router()

router.post('/signup', limiter(15*60*1000, 2), registration)

router.post('/login', login)

router.post('/logout', guard, logout)

router.get('/current', guard, current )



export default router;