import User from '../model/user'

const findById = async (id) => {
    return await User.findById(id)
}

const findByEmail = async (email) => {
    return await User.findOne({email})
}

const create = async (body) => {
    const user = new User (body)
    return await user.save()
}

const updateToken = async (id, token) => {
    return await User.updateOne ({_id: id}, {token})
}

const findByVerifyToken =  async ( verifyTokenEmail) => {
    return  await User.findOne({ verifyTokenEmail});
}
////
const  updateVerify = async (id, status) => {
    return await User.updateOne (
        {_id: id},
        {isVerify: status, verifyTokenEmail: null})
}

const findByToken =  (token) => {
    return  User.findOne({token});
}

const updateAvatar = async (id, avatar, idAvatarCloud= null) => {
    return await User.updateOne ({_id: id}, {avatar, idAvatarCloud})
}



export default {findById, findByEmail, create, updateToken,  findByToken, updateAvatar, findByVerifyToken, updateVerify }