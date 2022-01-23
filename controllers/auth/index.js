import {HttpCode} from '../../lib/constants'
import authService from '../../service/auth';
import {
  UploadFileService,
  LocalFileStorage,
  CloudFileStorage
} from '../../service/file-storage';

import CloudStorage from '../../service/file-storage/cloud-storage';
import {
  EmailService,
  SenderNodemailer,
  SenderSendgrid
} from'../../service/email'

import repositoryUsers from '../../repository/users'



const registration = async (req, res, next) => {
    try {
      const {email} = req.body;
      const isUserExist = await authService.isUserExist(email);

      if (isUserExist) {
        return  res
                  .status(HttpCode.CONFLICT)
                  .json( {
                    status: 'error',
                    code: HttpCode.CONFLICT,
                    message: 'Email is already exist' 
                  });
      }

      const userData = await authService.create(req.body)

const emailService = new EmailService(
    process.env.NODE_ENV,
    new SenderSendgrid()
  )

  const isSend= await emailService.sendVerifyEmail(
     email,
     userData.name,
     userData.verifyTokenEmail,
    )

    delete userData.verifyTokenEmail

      res.status(HttpCode.CREATED).json( {
        status: 'success',
        code: HttpCode.CREATED,
        data: {...userData, isSendEmailVerify: isSend}
        });
    } catch (err){
        next (err);
    }
}


  const login = async (req, res, next) => {
    console.log (req.query);
    const  {email, password} = req.body
    const user =  await authService.getUser(email, password);

    if (!user) {
      return  res
                .status(HttpCode.UNAUTHORIZED)
                .json( {
                  status: 'error',
                  code: HttpCode.UNAUTHORIZED,
                  message: 'Invalid credentials' 
                });
    }

    const token = authService.getToken(user);
    await authService.setToken(user.id, token)

    res.status(HttpCode.OK).json( {status: 'success', code: HttpCode.OK, data : {token} } );
  }


  const logout = async (req, res, next) => {
    console.log (req.query)
    
    await authService.setToken(req.user.id, null);
    res
    .status(HttpCode.NO_CONTENT)
    .json( {status: 'success', code: HttpCode.OK, data : {} } );
  }


  const current = async (req, res, next) => {
   
    const token = req.get('authorization')?.split(' ')[1];

    const data =  await authService.currentUser (token) 
    const {email,subscription } = data 

      return  res
                .status(HttpCode.OK)
                .json( {
                  status: 'success',
                  code: HttpCode.OK,
                  data : {email, subscription},
                  
                  message: `email:  ${email} , subscription: ${subscription}`
                });
   
  }


  const uploadAvatar = async (req, res, next) => {
    
    const uploadService = new UploadFileService (
      
      // LocalFileStorage,
      CloudStorage,
      req.file,
      req.user,
      )

    const avatarUrl = await uploadService.updateAvatar()

    res
    .status(HttpCode.OK)
    .json( {status: 'success', code: HttpCode.OK, data: {avatarUrl}  });
  }

  //////////

  const verifyUser = async (req, res, next) => {
    const verifyToken = req.params.token

    const userFromToken = await repositoryUsers.findByVerifyToken(verifyToken)
    
    if (userFromToken) {
      await repositoryUsers.updateVerify (userFromToken.id, true)
    
      return res.status(HttpCode.OK).json({
        status: 'success', code: HttpCode.OK, data: {message: 'Success'}  });
    }

    res
    .status(HttpCode.BAD_REQUEST)
    .json({
      status: 'success',
      code: HttpCode.BAD_REQUEST,
      data: {message: 'Invalid token'}
      });
    
  }

  ////////////

  const repeatEmailForVerifyUser = async (req, res, next) => {
    
    const {email} = req.body
    const user = await repositoryUsers.findByEmail(email)

    if (user) {
      const {email, name, verifyTokenEmail} = user  
      console.log ( "name ", name )
      const emailService = new EmailService(
          process.env.NODE_ENV,
          new SenderNodemailer()
        )
        
      const isSend= await emailService.sendVerifyEmail(
          email,
          name,
          verifyTokenEmail,
        )

        if (isSend) {
            return res.status(HttpCode.OK).json({
          status: 'success',
          code: HttpCode.OK,
          data: {message: 'Success'}
          });
        }   

        return res.status(HttpCode.UE).json({
          status: 'error',
          code: HttpCode.UE,
          data: {message: 'Unprocessable Entity'}
          });
        
    }

     res.status(HttpCode.NOT_FOUND).json({
      status: 'error',
      code: HttpCode.NOT_FOUND,
      data: {message: 'User with email not found'}
     });
 
  }


export {registration, login, logout, current, uploadAvatar, verifyUser, repeatEmailForVerifyUser }


