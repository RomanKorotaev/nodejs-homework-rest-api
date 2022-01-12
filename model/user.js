import {Role, MIN_AGE, MAX_AGE} from '../lib/constants'
import pkg from 'mongoose';
// import bcrypt from 'bcryptjs/dist/bcrypt';
import bcrypt from 'bcryptjs';
const { Schema, model } = pkg;


const userSchema = new Schema({
    name: {
      type: String,
      default: 'Guest'
    },
    email: {
      type: String,
      required: [true, 'Set email for user'],
      unique: true,
      validate (value) {
          const re = /\S+@\S+\.\S+/
          return re.test(String(value).trim().toLocaleLowerCase())
      }
    },
    password: {
        type: String,
        required: [true, 'Set password for user'],
        unique: true,
      },
 
      role: {
          type: String,
          enum:{
              values: Object.values(Role),
              message: 'Role is not allowed'
          },
          dafault: Role.USER,
      },

      subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
      },

      token: {
          type: String,
          default: null,
      },


  },

   {
       versionKey: false,
        timestamps: true,
        toJSON: {virtuals: true,
        transform: function(doc, ret) {
            delete ret._id;
            return ret;
            },
        },
        toObject:{virtuals: true}
    }
);

//   contactSchema.virtual('additionalVirtualField').get(function() {
//             return "It's additional virtual field for some data."
//   }) 


  //TODO

  userSchema.pre ('save', async function (next) {
      if (this.isModified ('password')){
        const salt = await bcrypt.genSalt(6)
        this.password = await bcrypt.hash (this.password, salt)
      } 
      next();
  })

  //methods - это объект мангуса, который хранит наши кастомные функции
    userSchema.methods.isValidPassword = async function (password) {
        //метод bcrypt.compare принимает 2 параметра: пароль и хеш. Сравнивает полученный пароль с тем, что хранится в хеше
        return await bcrypt.compare (password, this.password)
    }
  
  const User = model ('user', userSchema);

  export default User;