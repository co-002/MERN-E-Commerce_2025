import { Cart } from "../modals/Cart.js";

// Add to cart
const addToCart = async (req, res) => {
  try {
    let { productId, price, title, qty, imgSrc } = req.body;
    price = parseInt(price);
    qty = parseInt(qty);
    const userId = req.user;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].qty++;
      cart.items[itemIndex].price += price;
    } else {
      cart.items.push({ productId, price, title, qty, imgSrc });
    }

    await cart.save();
    res.json({
      message: "Item added to cart",
      cart,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
    });
  }
};

// Get user cart
const userCart = async (req, res) => {
  try {
    const userId = req.user;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.json({
        message: "Cart not found",
        success: false,
      });
    }
    res.json({
      message: "User cart",
      cart,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
    });
  }
};

// Remove product from cart
const removeProductFromCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.user;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.json({
        message: "Cart not found",
        success: false,
      });
    }
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );
    await cart.save();

    res.json({
      message: "Product removed from cart",
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
    });
  }
};

// Clear cart
const clearCart = async (req, res) => {
  try {
    const userId = req.user;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ items: [] });
    } else {
      cart.items = [];
    }
    await cart.save();

    res.json({
      message: "Cart cleared",
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
    });
  }
};

// Decrease aty from cart
const decreaseProductQty = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const userId = req.user;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex > -1) {
      const item = cart.items[itemIndex];
      if (item.qty > 1) {
        const pricePerUnit = item.price / item.qty;
        item.qty--;
        item.price -= pricePerUnit;
      } else {
        cart.items.splice(itemIndex, 1);
      }
    } else {
      return res.json({
        message: "Invalid product item",
        success: false,
      });
    }
    await cart.save();
    res.json({
      message: "Item quantity decreased",
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
    });
  }
};

export {
  addToCart,
  userCart,
  removeProductFromCart,
  clearCart,
  decreaseProductQty,
};
