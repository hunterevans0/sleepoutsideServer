import productModel from "../models/product.model.mts";

const getProductById = async (id: string) => {
  return await productModel.getProductById(id);
};

 const getAllProducts = async () => {
  return await productModel.getAllProducts();
};

export default {
  getAllProducts,
  getProductById
};