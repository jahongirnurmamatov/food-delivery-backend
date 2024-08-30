import User from '../models/userModel.js';

export const addToCart = async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.body.userId });
        let cartData = await user.cart;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }
        await User.findByIdAndUpdate(req.body.userId, { cart: cartData });
        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        res.json({ success: false, message: error });
    }
}

export const removeFromCart = async (req, res) => {
    try {
        let user = await User.findById({ _id: req.body.userId });
        let cartData = await user.cart;
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await User.findByIdAndUpdate(req.body.userId, { cart: cartData });
        res.json({ success: true, message: "Removed from cart" });
    } catch (error) {   
        res.json({success:false, message:"Error in removing food item from cart"})
    }
}
export const getCart = async (req, res) => {
    try {
        let user = await User.findById( req.body.userId );
        let cartData= await user.cart;
        res.json({success:true,data:cartData});
    } catch (error) {
        res.json({success:false,message:"Error in loading cart data"})
    }
}