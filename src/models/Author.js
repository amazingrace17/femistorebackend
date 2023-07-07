import mongoose from 'mongoose'

const {Schema, model , SchemaTypes} = mongoose

const authorSchema = new Schema(
  {
    userId: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
    blogs:[
      {
      type: SchemaTypes.ObjectId,
      ref: 'blog',
      // required: true,
     },
    ],
     
     
  
  
 
  },{ timestamps: true }
);

export const Author = model ('author', authorSchema)