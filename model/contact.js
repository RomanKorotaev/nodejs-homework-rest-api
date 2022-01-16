// import { string } from 'joi';
import {MIN_AGE, MAX_AGE} from '../lib/constants'
import pkg from 'mongoose';
const { Schema, SchemaTypes, model } = pkg;


const contactSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    age: {
      type: Number,   
      min: MIN_AGE,
      max: MAX_AGE,
      default: null,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },

    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
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

  contactSchema.virtual('additionalVirtualField').get(function() {
            return "It's additional virtual field for some data."
  }) 
  
  const Contact = model ('contact', contactSchema);

  export default Contact;