import express from 'express';
import authMiddlware from '../middleware/auth.js';
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js';

const cartRouter = express.Router();

cartRouter.post('/add',authMiddlware, addToCart);
cartRouter.post('/remove',authMiddlware, removeFromCart);
cartRouter.get('/get-cart',authMiddlware, getCart);

export default cartRouter;