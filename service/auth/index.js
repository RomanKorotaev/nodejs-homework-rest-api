import jwt from 'jsonwebtoken'
import Users from '../../repository/users'
const SECRET_KEY = process.env.JWT_SECRET_KEY


class AuthService {
    async isUserExist (email) {
        const user = await Users.findByEmail(email)
        return !!user          // !!user  convert to boolean type

    }

    async create (body) {
        const {id, name, email, role, avatarURL, verifyTokenEmail } = await Users.create(body);
        return {
            id,
            name,
            email,
            role,
            avatarURL,
            verifyTokenEmail,
        }
    }

    async getUser (email, password) {
        const user = await Users.findByEmail(email);
        const isValidPassword = await user?.isValidPassword(password)
            if (!isValidPassword || !user?.isVerify) {
                return null;
            }
        return user;
    }

    getToken (user) {
        const {id, email} = user;
        const payload = {id, email};
        const token= jwt.sign(payload, SECRET_KEY, {expiresIn: '8h'})
        return token;
    }

    async setToken (id, token) {
        await Users.updateToken (id, token)
    }

     currentUser (token) {
        let data =  Users.findByToken(token)
        console.log ("async currentUser = ", data)
        return data         
    }

}


export default new  AuthService();