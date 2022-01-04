import {HttpCode} from '../../lib/constants'
import AuthService from '../../service/auth';

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
    const user = authService.getUser(email, password);

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
    // const contacts = await repositoryContacts.listContacts(req.query);
    // console.log("!!! contacts",contacts)
    // // res.status(200).json( contacts );
    res.status(HttpCode.OK).json( {status: 'success', code: HttpCode.OK, data : {} } );
  }


export {registration, login, logout }


