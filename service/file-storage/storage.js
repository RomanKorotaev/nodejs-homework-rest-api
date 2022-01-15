import Jimp from 'jimp'

class FileStorage {
    constructor(Storage, file, user) {
        this.storage = new Storage (file, user)
        this.pathFile = file.path
    }

    async updateAvatar () { }

    async transformAvatar (pathFile) { }

}

export default FileStorage;