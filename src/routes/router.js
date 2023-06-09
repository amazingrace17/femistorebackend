import express from 'express';
// import restaurantController from '../controllers/RestaurantController.js'

// import userRouter from './userRoutes.js';
// import adminRouter from './adminRoutes.js';
// import categoryRouter from './categoryRoutes.js';
// import subCategoryRouter from './subCategoryRoutes.js';
// import cartRouter from './cartRouter.js'
import blogPostRouter from './blogPostRoutes.js'
// import searchRouter from './searchRoutes.js'

const router = express.Router();

// ROUTES
// router.use('/users', userRouter)
router.use('/blogs', blogPostRouter)

// router.get("/restaurants", restaurantController.getRestaurants);
// router.get("/restaurant/:restId", restaurantController.getRestaurant);

// router.use('/admins', adminRouter)
// router.use('/categories', categoryRouter)
// router.use('/subcategories', subCategoryRouter)
// router.use('/cart', cartRouter)
// router.use('/darkcart', cartRouter)
// router.use('/search', searchRouter)

export default router;
