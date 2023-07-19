// import { Product } from '../models/Product.js';
import { BlogPost } from '../models/Blog.js';
import pagination from '../services/pagination.js';
import emptyFields from '../services/emptyFields.js';


import axios from 'axios'

const POSTMARK_API_TOKEN = `3837a7cd-0035-4546-9157-6e19bf1dd873`
const BlogPostController = {
  createBlogPost: async (req, res) => {
    const { title, description, context, avatarUrl, intextImage1, intextImage2, intextImage3, publishedDate,estimatedTime,author,  imageUrl } = req.body;
    
    /* 
    if(!req.file) {
      return res.status(400).json({
        status: "Failed",
        message: "Please select a product image to upload"
      })
    } */
    const reqFields = ['title','context', 'estimatedTime', 'author'];
    // emptyFields(req, res, reqFields);
    let emptyFlds = [];

    for (const field of reqFields) {
      if (!req.body[field] ) {
        emptyFlds.push(field);
      }
    }

    if (emptyFlds.length > 0) {
      return res.status(400).json({ 
        status: 'failed', 
        message: `The following fields: '${emptyFlds.join(', ')}' are required` 
      });
    }

    try {
      const newBlogPost = new BlogPost(req.body);
      const blogPost = await newBlogPost.save();

      if (!blogPost) {
        return res
          .status(400)
          .json({ status: 'fail', message: 'something went wrong' });
      }
      /* 
      // Upload product image
      // this.setProductImage();
      product.imageUrl = req.file.path;
      product.save(); */

      return res
        .status(201)
        .json({ status: 'success', message: 'successful', data: blogPost });
    } catch (err) {
      return res
        .status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  setProductImage: async (req, res) => {
    const { id } = req.params;
    
    if(!req.file) {
      return res.status(400).json({
        status: "Failed",
        message: "Please select a product image to upload"
      })
    }

    try {
      const data = await Product.findByIdAndUpdate(
        { _id: id },
        { imageUrl: req.file.path },
        { new: true }
      );

      return res.status(200).json({
        data,
        status: "Success",
        message: "Product image uploaded successfully!"
      })
    } catch (error) {
      res.status(500).json({
        status: "Failed",
        message: error.message
      })  
    }
  },

  getBlogPost: async (req, res) => {

    try {
      const blogPost= await BlogPost.find({})

        .exec();
      const pgn = await pagination(req, 1,BlogPost);
      
      return res.status(200).json({
        status: 'success',
        message: 'successful',
        data: blogPost,

        // pagination
        documentCount: pgn.documentCount,
        totalPages: pgn.totalPages,
        nextPage: pgn.nextPage,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  getBlogPostById: async (req, res) => {
    const { id } = req.params;
    try {
      const blogPost = await BlogPost.findById(id)
        // .populate('category', 'name')
        // .populate('subcategory', 'name')
        .exec();
      if(!blogPost) {
        return res.status(404).json({ 
          status: "failed", 
          message: "blog not found" 
        });
      }

      return res
        .status(200)
        .json({ status: 'success', message: 'successful', data: blogPost});
    } catch (err) {
      return res
        .status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
    
  },
sendEmail:async(req, res) =>{
    const { report, email} = req.body;

    try{
      const response = await axios.post(
        'https://api.postmarkapp.com/email',
        {
        From: 'hello@vitract.com',
        To: email,
        Subject : ' Report Email',
        TextBody: `Report : ${report}`,

      },
      
{
 headers:{
        'Content-Type' : 'application/json',
        'X-Postmark-Server-Token': POSTMARK_API_TOKEN,
      } 
}

      
      
      );
      console.log('Email sent' , response.data)
     res.status(200).json({success:true}) 
  }catch(error){
    console.error("Error Sending email")
    res.status(500).json({success:false, error :'FAiled to send email'})
  }
},
  updateBlogPost: async (req, res) => {
    const { id } = req.params;
    // const reqFields = ['title', 'description', 'context', 'context1','context2','context3',  'avatarUrl', 'author', 'references', 'illustration','intextImage1','intextImage2','intextImage3'];

     const reqFields = ['context1','context2','context3',];
    // emptyFields(req, res, reqFields);
    let emptyFlds = [];

    for (const field of reqFields) {
      if (!req.body[field] ) {
        emptyFlds.push(field);
      }
    }

    if (emptyFlds.length > 0) {
      return res.status(400).json({ 
        status: 'failed', 
        message: `The following fields: '${emptyFlds.join(', ')}' are required` 
      });
    }

    try { 
      const blog = await BlogPost.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
      ); 

      if (!blog) {
        return res
          .status(400)
          .json({ status: 'fail', message: 'blog not updated' });
      }

      return res.status(200)
        .json({ status: 'success', message: 'successfully updated', data: blog });
   
    } catch (err) {
      return res.status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  deleteProduct: async (req, res) => {
    const { id } = req.params;

    try {
      const product = await Product.findById(id);
      if(!product) {
        return res.status(404).json({ 
          status: "failed", 
          message: "product not found" 
        });
      }
      product.deleteOne();

      return res.status(200).json({ 
          status: 'success',
          message: 'successfully deleted', 
          data: product 
        });
          

    } catch (err) {
      return res.status(500).json({ 
          status: 'fail', 
          message: 'server err', 
          err 
        });
    }
  },

  createOrder: async(req,res) => {
    const {userId, product, bill} = req.body;
    if(!userId || !product || !bill){
      return res 
      .status(400)
      .json({status: 'fail', message : 'something went wrong'});

    }
    return res
    .status(201)
    .json({
      status:'success' , message: 'successful', data: order
    })
  },

  getOrder: async(req,res) => {
    const Page_size = 20;
    let page = 1;
    let skip;
    if (req.query.page){
        page = Number(req.query.page);
        skip= (page -1 ) * Page_size;
    }
    try{
      const order=  await Order. find({}).populate().lean().exec();
      const docCount = await Order.find({}).countDocuments();
      return res.status(201).json({
        status: ' success',
        message : 'successful',
        data : order, 
        documentCount:docCount,
        totalPages : Math.ceil(docCount/Page_size),
        nextPage: Math.ceil(docCount/Page_size) > page ? `${page + 1}` : null,
      });
    }
    catch(err){
      return res
      .status(500)
      .json({status : 'fail', message : 'server err', err})
    }
  }
};

export default BlogPostController;
