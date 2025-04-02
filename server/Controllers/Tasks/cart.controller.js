// const Cart = require('../../Models/Tasks/Cart');
// const Product = require('../../Models/Tasks/Product');
// const mongoose = require("mongoose");

// const getCartItems = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     console.log(`Fetching cart items for user ID: ${userId}`);

//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       console.error(`Invalid user ID: ${userId}`);
//       return res.status(400).json({ success: false, message: 'Invalid user ID' });
//     }

//     const cart = await Cart.findOne({ userId }).populate('products.productId', 'name price image rating');
//     if (!cart) {
//       console.error(`Cart not found for user ID: ${userId}`);
//       return res.status(404).json({ success: false, message: 'Cart not found' });
//     }

//     res.status(200).json(cart.products);
//   } catch (err) {
//     console.error('Error fetching cart items:', err.message);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

// const addToCart = async (req, res) => {
//   console.log('Request body:', req.body); // Log the entire request body
//   try {
//     const userId = req.user.id;
//     const { productId, quantity } = req.body;

//     console.log('User ID:', userId); // Log the userId
//     console.log('Product ID:', productId); // Log the productId
//     console.log('Product ID Type:', typeof productId); // Log the type of productId

//     const productIdStr = productId.toString(); // Ensure productId is a string

//     if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productIdStr)) {
//       console.error(`Invalid user ID or product ID: ${userId}, ${productIdStr}`);
//       return res.status(400).json({ success: false, message: 'Invalid user ID or product ID' });
//     }

//     let cart = await Cart.findOne({ userId });
//     if (!cart) {
//       console.log(`Creating a new cart for user ID: ${userId}`);
//       cart = new Cart({ userId, products: [] });
//     }

//     const existingProductIndex = cart.products.findIndex(p => p.productId.toString() === productIdStr);
//     if (existingProductIndex !== -1) {
//       cart.products[existingProductIndex].quantity += quantity;
//     } else {
//       cart.products.push({ productId: productIdStr, quantity });
//     }

//     await cart.save();
//     res.status(200).json({ success: true, data: cart });
//   } catch (err) {
//     console.error('Error adding to cart:', err.message);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };



// const deleteCartItem = async (req, res) => {
//   try {
//     const userId = req.user.id; // Correctly extract userId from req.user
//     const { itemId } = req.params;

//     const cart = await Cart.findOneAndUpdate(
//       { userId },
//       { $pull: { products: { productId: itemId } } },
//       { new: true }
//     ).populate('products.productId', 'name price image rating');

//     if (!cart) {
//       console.error(`Cart not found for user ID: ${userId}`);
//       return res.status(404).json({ success: false, message: 'Cart not found' });
//     }

//     res.status(200).json({ success: true, message: 'Item deleted', cart: cart.products });
//   } catch (err) {
//     console.error('Error deleting cart item:', err.message);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

// const updateCartItem = async (req, res) => {
//   try {
//     const userId = req.user.id; // Extract user ID from the token
//     const { productId, quantity, checked } = req.body; // Get productId, quantity, and checked from request body

//     const cart = await Cart.findOne({ userId });

//     if (!cart) {
//       return res.status(404).json({ success: false, message: 'Cart not found' });
//     }

//     // Find the product in the cart and update its quantity and checked status
//     const productIndex = cart.products.findIndex(item => item.productId.toString() === productId);
//     if (productIndex !== -1) {
//       if (quantity !== undefined) {
//         cart.products[productIndex].quantity = quantity;
//       }
//       if (checked !== undefined) {
//         cart.products[productIndex].checked = checked;
//       }
//       await cart.save();
//       res.status(200).json({ success: true, message: 'Cart item updated', cart: cart.products });
//     } else {
//       res.status(404).json({ success: false, message: 'Product not found in cart' });
//     }
//   } catch (err) {
//     console.error('Error updating cart item:', err.message);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };


// module.exports = {
//   getCartItems,
//   addToCart,
//   deleteCartItem,
//   updateCartItem,
//   clearCart
// };


const Cart = require('../../Models/Tasks/Cart');
const Product = require('../../Models/Tasks/Product');
const mongoose = require("mongoose");

// Get cart items for the authenticated user
const getCartItems = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(`Fetching cart items for user ID: ${userId}`);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.error(`Invalid user ID: ${userId}`);
      return res.status(400).json({ success: false, message: 'Invalid user ID' });
    }

    const cart = await Cart.findOne({ userId }).populate('products.productId', 'category name description price rating reviewCount image discountPrice oldPrice discountPercent isTodaysDeal');
    if (!cart) {
      console.error(`Cart not found for user ID: ${userId}`);
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    res.status(200).json(cart.products);
  } catch (err) {
    console.error('Error fetching cart items:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Add a product to the cart
const addToCart = async (req, res) => {
  console.log('Request body:', req.body); // Log the entire request body
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    console.log('User ID:', userId); // Log the userId
    console.log('Product ID:', productId); // Log the productId
    console.log('Product ID Type:', typeof productId); // Log the type of productId

    const productIdStr = productId.toString(); // Ensure productId is a string

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(productIdStr)) {
      console.error(`Invalid user ID or product ID: ${userId}, ${productIdStr}`);
      return res.status(400).json({ success: false, message: 'Invalid user ID or product ID' });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      console.log(`Creating a new cart for user ID: ${userId}`);
      cart = new Cart({ userId, products: [] });
    }

    const existingProductIndex = cart.products.findIndex(p => p.productId.toString() === productIdStr);
    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      const product = await Product.findById(productIdStr);
      if (!product) {
        console.error(`Product not found: ${productIdStr}`);
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
      cart.products.push({ productId: productIdStr, quantity });
    }

    await cart.save();
    res.status(200).json({ success: true, data: cart });
  } catch (err) {
    console.error('Error adding to cart:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete a product from the cart
const deleteCartItem = async (req, res) => {
  try {
    const userId = req.user.id; // Correctly extract userId from req.user
    const { itemId } = req.params;

    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { products: { productId: itemId } } },
      { new: true }
    ).populate('products.productId', 'category name description price rating reviewCount image discountPrice oldPrice discountPercent isTodaysDeal');

    if (!cart) {
      console.error(`Cart not found for user ID: ${userId}`);
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    res.status(200).json({ success: true, message: 'Item deleted', cart: cart.products });
  } catch (err) {
    console.error('Error deleting cart item:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Update a product in the cart
const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from the token
    const { productId, quantity, checked } = req.body; // Get productId, quantity, and checked from request body

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    // Find the product in the cart and update its quantity and checked status
    const productIndex = cart.products.findIndex(item => item.productId.toString() === productId);
    if (productIndex !== -1) {
      if (quantity !== undefined) {
        cart.products[productIndex].quantity = quantity;
      }
      if (checked !== undefined) {
        cart.products[productIndex].checked = checked;
      }
      await cart.save();
      res.status(200).json({ success: true, message: 'Cart item updated', cart: cart.products });
    } else {
      res.status(404).json({ success: false, message: 'Product not found in cart' });
    }
  } catch (err) {
    console.error('Error updating cart item:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    cart.products = [];
    await cart.save();

    res.status(200).json({ success: true, message: 'Cart cleared' });
  } catch (err) {
    console.error('Error clearing cart:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


module.exports = {
  getCartItems,
  addToCart,
  deleteCartItem,
  updateCartItem,
  clearCart
};
