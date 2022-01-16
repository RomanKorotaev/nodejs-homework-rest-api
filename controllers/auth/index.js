import {HttpCode} from '../../lib/constants'
import AuthService from '../../service/auth';
import {
  UploadFileService,
  LocalFileStorage,
  CloudFileStorage
} from '../../service/file-storage';
import CloudStorage from '../../service/file-storage/cloud-storage';

const authService = new  AuthService();

const registration = async (req, res, next) => {
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

    const data = await authService.create (req.body)

  res.status(HttpCode.OK).json( {status: 'success', code: HttpCode.OK, data  });
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

export {registration, login, logout, current, uploadAvatar }


