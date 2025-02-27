import { Products } from "../modals/Product.js";

// Add Product
const addProduct = async (req, res) => {
  try {
    const { title, description, price, category, qty, imgSrc, createdAt } =
      req.body;
    const product = new Products({
      title,
      description,
      price,
      category,
      qty,
      imgSrc,
      createdAt,
    });
    await product.save();
    res.json({
      message: "Product added successfully",
      product,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
    });
  }
};

// Get Products
const getProducts = async (req, res) => {
  try {
    const products = await Products.find().sort({ createdAt: -1 });
    res.json({
      message: "Products retrieved successfully",
      products,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
    });
  }
};

// Find product by ID
const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Products.findById(id);
    if (!product) {
      return res.json({
        message: "Product not found",
        success: false,
      });
    }
    res.json({
      message: "Product retrieved",
      product,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
    });
  }
};

// Update Product by Id
const updateProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Products.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!product) {
      return res.json({
        message: "Product not found",
        success: false,
      });
    }
    res.json({
      message: "Product updated successfully",
      product,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
    });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Products.findByIdAndDelete(id);
    if (!product) {
      return res.json({
        message: "Product not found",
        success: false,
      });
    }
    res.json({
      message: "Product deleted successfully",
      product,
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
  addProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
