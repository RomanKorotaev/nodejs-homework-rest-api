import {Role, MIN_AGE, MAX_AGE} from '../lib/constants'
import pkg from 'mongoose';
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
      token: {
          type: String,
          default: null,
      }

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
  
  const User = model ('user', userSchema);

  export default User;