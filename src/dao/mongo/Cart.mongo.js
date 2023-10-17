import Cart from "./models/Cart.js";
import Product from "./models/Product.js";
import Ticket from "./models/Ticket.js";

class CartDao {
  constructor() {
    this.CartModel = Cart;
    this.ProductModel = Product;
    this.TicketModel = Ticket;
  }

  getCarts = async (array) => {
    return this.CartModel.aggregate(array);
  };

  getCart = async (id) => {
    return await this.CartModel.findById(id);
  };

  getCartBill = async (array) => {
    return await this.CartModel.aggregate(array);
  };

  createCart = async () => {
    return await this.CartModel.create({ products: [] });
  };

  addProduct = async (id, modifiedCart) => {
    return await this.CartModel.findByIdAndUpdate(id, modifiedCart, {
      new: true,
    });
  };

  deleteProduct = async (id, modifiedCart) => {
    return await this.CartModel.findByIdAndUpdate(id, modifiedCart, {
      new: true,
    });
  };

  clearCart = async (id, modifiedCart) => {
    return await this.CartModel.findByIdAndUpdate(id, modifiedCart, {
      new: true,
    });
  };

  deleteCart = async id => {
    return await this.CartModel.findByIdAndDelete(id)
  }

  purchase = async (ticket) => {
    return await this.TicketModel.create(ticket);
  };
}

export default CartDao;
