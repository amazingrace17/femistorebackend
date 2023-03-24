import mongoose from 'mongoose';
import validator from 'validator';

const { Schema, model,SchemaTypes } = mongoose;


const userSchema = new Schema({
 
  gender:{
    type: String,
    enum:["male", "female"]
  },
//  cart: {
//     type: SchemaTypes.ObjectId,
//     ref: 'cart',
//     required: true,
//   },
  chechoutTime:{
    type: String
  },
   username:{
 type: String
  }
},
  { timestamps: true }
);

export const User = model('user', userSchema);