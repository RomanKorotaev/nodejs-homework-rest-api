import Users from '../../repository/users'

class AuthService {
    async isUserExist (email) {
        const user = await Users.findByEmail(email)
        return !!user          // !!user  convert to boolean type

    }

    async create (body) {
        const {id, name, email, role} = await Users.create(body);
        return {
            id,
            name,
            email,
            role,
        }
    }
}

export default AuthService;