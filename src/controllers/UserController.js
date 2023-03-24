
import dotenv from 'dotenv';


import { User } from '../models/User.js';


dotenv.config();

const UserController = {
 
  
  register: async (req, res) => {
    const reqBody = req.body;
    const { gender, username } = req.body;
    const reqFields = ['gender', 'username'];

    try {
      for (const field of reqFields) {
        if (!reqBody[field] ) {
          return res
            .status(400).json({ 
              status: 'failed', 
              message: `${field} field is required` 
            });
        }
      }
        const newUser = new User({ gender, username });
        const savedUser = await newUser.save();

        if(savedUser) {
      
          res.status(200).json({ 
            status: 'success',
            data: {
              id: savedUser._id,
              username: savedUser.username,
              gender:savedUser.gender,


            },
            message: 'user registration successful'
          });
         
        }
      
    } catch (error) {
      return res.status(500).json({
        status: "failed",
        error
      })
    }
  },
  getUsers: async(req,res) =>{
    try {
      const users = await User.find({}).lean().exec();
      return res
        .status(200)
        .json({ status: 'success', message: 'users retrieved', data: users });
    } catch (err) {
      return res
        .status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  }
}

export default UserController;