import { ProductDao, CartDao, UserDao } from "../dao/factory.js";
import ProductRepository from "../repositories/Product.repository.js";
import CartRepository from "../repositories/Cart.repository.js";
import UserRepository from "../repositories/User.repository.js";

const productService = new ProductRepository(new ProductDao());
const cartService = new CartRepository(new CartDao());
const userService = new UserRepository(new UserDao());

export { productService, cartService, userService };
