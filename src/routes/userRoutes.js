import { Router } from 'express';
import cors from 'cors';
import UserController from '../controllers/UserController.js';
import authValidator from '../middlewares/AuthValidator.js';
import isVerified from '../middlewares/IsVerified.js';
import { upload } from "../config/multer.js";

const router = Router();

router.route('/register')
    .post(UserController.register);

 router.route('/')
    .get(UserController.getUsers);


export default router;