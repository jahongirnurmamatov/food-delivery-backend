import express from 'express';
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from '../controllers/orderController.js';
import authMiddlware from '../middleware/auth.js';

const orderRouter = express.Router();

orderRouter.post('/place',authMiddlware,placeOrder);
orderRouter.post('/verify',verifyOrder);
orderRouter.get('/user-orders',authMiddlware,userOrders);
orderRouter.get('/list-orders',listOrders);
orderRouter.post('/status',updateStatus);


export default orderRouter;