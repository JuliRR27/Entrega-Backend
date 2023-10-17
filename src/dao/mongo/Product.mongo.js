import Product from "./models/Product.js";

class ProductDao {
  constructor() {
    this.ProductModel = Product;
  }

  getProducts = async (name, limit, page) => {
    return await this.ProductModel.paginate({ name }, { limit, page });
  };

  getProduct = async (id) => {
    return await this.ProductModel.findById(id);
  };

  createProduct = async (productData) => {
    return await this.ProductModel.create(productData);
  };

  updateProduct = async (id, productData) => {
    return await this.ProductModel.findByIdAndUpdate(id, productData, {
      new: true,
    });
  };

  deleteProduct = async (id) => {
    return await this.ProductModel.findByIdAndDelete(id);
  };
}

export default ProductDao;
