import multer from 'multer'
const UPLOAD_DIR = process.env.UPLOAD_DIR

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOAD_DIR);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now().toString()}_${file.originalname}` );
    },
    // limits: {
    //   fileSize: 1048576,
    // },
  });
 
  export const upload = multer ({ 
      storage: storage,
      limits: { fileSize: 500000 },
      fileFilter: (req, file, cb)=> {

    if (file.mimetype.includes('image')) {
        return cb(null, true)
    }
         // Вы можете всегда вернуть ошибку, если что-то пошло не так:
        cb(new Error('Wrong format file for avatar!'))
      }  
})

