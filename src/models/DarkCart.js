import mongoose from 'mongoose'

const {Schema, model , SchemaTypes} = mongoose

const cartSchema = new Schema(
  {
    userId: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
    items:
     {
      type: Number,
      required:true,
     },
     
    timeTaken:{
      type:String,
      required:true,

    },
    // items: [
    //   {
    //     productId: {
    //       type: SchemaTypes.ObjectId,
    //       ref: 'product',
    //     },
    //     name: {
    //       type: String,
    //     },
    //     quantity: {
    //       type: Number,
    //       required: true,
    //       min: [1, 'Quantity can not be less than 1'],
    //       default: 1,
    //     },
    //     price: {
    //       type: Number,
    //     },
    //   },
    // ],
    bill: {
      type: Number,
      // required: true,
      default: 0,
    },   
  },{ timestamps: true }
);

export const Cart2 = model ('cart2', cartSchema)