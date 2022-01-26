import {Router} from "express";

import {registration, login, logout, current, uploadAvatar, verifyUser, repeatEmailForVerifyUser} from '../../../controllers/auth';
import guard from '../../../middlewares/guard';
import { upload } from '../../../middlewares/upload';
import limiter from '../../../middlewares/rate-limit';
import  wrapperError  from '../../../middlewares/error-handler'


// import pkg from 'mongoose' ;
// import repositoryContacts from '../../../repository/contacts'

const router = new Router()

router.post('/signup', limiter(15*60*1000, 2), wrapperError (registration) )

router.post('/login', wrapperError (login) )

router.post('/logout', guard, wrapperError (logout) )

router.get('/current', guard, wrapperError (current ) )

///////////////
router.patch('/avatars', guard, upload.single('avatar'), wrapperError (uploadAvatar) )

router.get('/verify/:token',  wrapperError (verifyUser ) )

router.post('/verify',  wrapperError (repeatEmailForVerifyUser) )

export default router;