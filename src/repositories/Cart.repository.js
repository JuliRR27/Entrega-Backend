class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getCarts = async (array) => {
    return await this.dao.getCarts(array);
  };

  getCart = async (id) => {
    return await this.dao.getCart(id);
  };

  getCartBill = async (array) => {
    return this.dao.getCartBill(array);
  };

  createCart = async () => {
    return this.dao.createCart();
  };

  addProduct = async (id, modifiedCart) => {
    return await this.dao.addProduct(id, modifiedCart);
  };

  deleteProduct = async (id, modifiedCart) => {
    return await this.dao.deleteProduct(id, modifiedCart);
  };

  clearCart = async (id, modifiedCart) => {
    return await this.dao.clearCart(id, modifiedCart);
  };

  deleteCart = async id => {
    return await this.dao.deleteCart(id);
  }

  purchase = async (ticket) => {
    return await this.dao.purchase(ticket);
  };
}

export default CartRepository;
