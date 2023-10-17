class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getProducts = async (name, limit, page) => {
    return await this.dao.getProducts(name, limit, page);
  };

  getProduct = async (id) => {
    return await this.dao.getProduct(id);
  };

  createProduct = async (productData) => {
    return await this.dao.createProduct(productData);
  };

  updateProduct = async (id, productData) => {
    return await this.dao.updateProduct(id, productData);
  };

  deleteProduct = async (id) => {
    return await this.dao.deleteProduct(id);
  };
}

export default ProductRepository;
