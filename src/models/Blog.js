import mongoose from 'mongoose';

const { Schema, model, SchemaTypes } = mongoose;

const BlogPostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    
    },
    context:{
      type:String,
    },
      context1:{
      type:String,
    },
      context2:{
      type:String,
    }, 
     context3:{
      type:String,
    },
    context4:{
      type:String,
    },
    avatarUrl:{
      type:String,
    },
   intextImage1:{
type: String
   },
   intextImage2:{
    type: String
       },
       intextImage3:{
        type: String
           },
           intextImage4:{
            type: String
               },
   publishedDate:{
    type: Date,
    required: true,
  },
   estimatedTime:{
    type:String,
   },
    imageUrl: {
      type: String,
    },
    author: { 
      type: String,
      required: true,
    },
   references:{
    type: String,
  
    
   },
  illustration:{
    type: String,
  
    
   },
    dateAdded: {
      type: Date,
      default: Date.now,
    },
  },

  { timestamps: true }
);

export const BlogPost = model('blogPost', BlogPostSchema);