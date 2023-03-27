import { Cart } from '../models/Cart.js';
import { Cart2 } from '../models/DarkCart.js';
import pagination from '../services/pagination.js';

const CartController = {
  createCart: async (req, res) => {
    let { userId, items } = req.body;

    if (!userId || !items || items.value < 5) {
      return res.status(400)
        .json({ status: 'fail', message: 'Please add some items to the cart' });
    }



    try {
      const cartExists = await Cart.findOne({ userId });
      let cart;
      if (cartExists) {

        req.body.items = items;
        
        cart = await Cart.findOneAndUpdate(
          userId,
          req.body,
          { new: true }
        );
        console.log('Updated Cart')
      } else {
        // const newCart = new Cart(req.body);
        const newCart = new Cart();
        newCart.userId = userId;
        newCart.items = items;
    

        cart = await newCart.save();
        console.log('New Cart')
      }
      
      console.log('...');
      console.log(cart);
      if (!cart) {
        return res
          .status(400)
          .json({ status: 'fail', message: 'cart not populated' });
      }
      return res.status(200)
        .json({ status: 'success', message: 'cart saved successfully', data: cart });
    } catch (err) {
      return res.status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },
  createDarkCart: async (req, res) => {
    let { userId, items, bill,timeTaken } = req.body;

    if (!userId || !items || items.value ) {
      return res.status(400)
        .json({ status: 'fail', message: 'Please add some items to the cart' });
    }



    try {
      const cartExists = await Cart2.findOne({ userId });
      let cart;
      if (cartExists) {

        req.body.items = items;
        
        cart = await Cart2.findOneAndUpdate(
          userId,
          req.body,
          { new: true }
        );
        console.log('Updated Cart')
      } else {
        // const newCart = new Cart(req.body);
        const newCart = new Cart2();
        newCart.userId = userId;
        newCart.items = items;
    newCart.timeTaken = timeTaken
    newCart.bill = bill

        cart = await newCart.save();
        console.log('New Cart')
      }
      
      console.log('...');
      console.log(cart);
      if (!cart) {
        return res
          .status(400)
          .json({ status: 'fail', message: 'cart not populated' });
      }
      return res.status(200)
        .json({ status: 'success', message: 'cart saved successfully', data: cart });
    } catch (err) {
      return res.status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },
  getCart: async (req, res) => {
    const { userId } = req.body;
    try {
      const cart = await Cart.findOne({ userId: userId }) 
        // .populate('user', )    
        .exec()
        ;
      return res.status(200)
        .json({ status: 'success', message: 'cart retrieved', data: cart });
    } catch (err) {
      return res.status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },
  getCarts: async (req, res) => {
   
    try {
      const cart =await Cart.find({})
        .populate('userId')    
        .exec()
        const pgn = await pagination(req, 1, Cart);
        ;
      return res.status(200)
        .json({ status: 'success', message: 'cart retrieved', documentCount: pgn.documentCount, data: cart });
    } catch (err) {
      return res.status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },
  getDarkCarts: async (req, res) => {
   
    try {
      const cart =await Cart2.find({})
        .populate('userId')    
        .exec()
        const pgn = await pagination(req, 1, Cart2);
        ;
      return res.status(200)
        .json({ status: 'success', message: 'cart retrieved', documentCount: pgn.documentCount, data: cart });
    } catch (err) {
      return res.status(500)
        .json({ status: 'fail', message: 'server err', err });
    }
  },

  deleteCart: async (req, res) => {
    const { userId } = req.body;

    try {
      const cart = await Cart.findOne({ userId });
      cart.deleteOne();

      return res.status(200).json({ 
          status: 'success',
          message: 'cart deleted successfully.', 
        });
    } catch (err) {
      return res.status(500).json({ 
          status: 'fail', 
          message: 'server err', 
          err 
        });
    }
  }
}

export default CartController;