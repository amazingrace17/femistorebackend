import { Router } from 'express';
import BlogPostController from '../controllers/BlogPostController.js';
// import isSeller from '../middlewares/IsSeller.js';
// import { upload } from "../config/multer.js";

// import authValidator from '../middlewares/AuthValidator.js';

const router = Router();

router.route('/')
  .post(BlogPostController.createBlogPost)
  .get(BlogPostController.getBlogPost)
  ;
// router.route('/:id')
//   .get(ProductController.getProductById)
//   .put([authValidator, isSeller], ProductController.updateProduct)
//   .delete([authValidator, isSeller], ProductController.deleteProduct)
//   .post([authValidator, isSeller], upload.single('imageUrl'), ProductController.setProductImage);
//   ;

//Order Route==============
// router.route('/order')
//   .post(authValidator, ProductController.createOrder)
//   .get(authValidator, ProductController.getOrder)
//   ;

export default router;