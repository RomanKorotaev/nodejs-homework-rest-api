import Users from '../../repository/users'

class AuthService {
    async isUserExist (email) {
        const user = await Users.findByEmail(email)
        return !!user          // !!user  convert to boolean type

    }
}

export default AuthService;