import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

class CartManager {
  async addProducts(cartId, data) {
    try {
      let cartFound = await Cart.findById(cartId);
      let productFound = await Product.findById(data.pid);

      if (!cartFound || !productFound) {
        return 404; // error: not found cart to update
      }

      if (
        Object.keys(data).length === 0 ||
        typeof data !== "object" ||
        data.units === 0
      ) {
        return 400; // error: data is required
      }

      let stock = productFound.stock;
      // Si el stock es mayor a las unidades a agregar, le resto esas unidades al stock, de lo contrario,
      // unidades a agregar será igual a stock para que no se agregue más de lo máximo disponible
      stock >= data.units
        ? (stock -= data.units)
        : ((data.units = stock), (stock = 0));

      if (cartFound.products.length === 0) {
        cartFound.products.push(data);
      } else {
        let productsId = [];
        cartFound.products.forEach((product) => {
          productsId.push(String(product.pid));
        });

        if (productsId.includes(data.pid)) {
          // Si el producto ya está dentro del array
          // Aumenta las unidades
          let productToAddUnits = cartFound.products.find(
            (product) => String(product.pid) === data.pid
          );
          productToAddUnits.units = productToAddUnits.units + data.units;
        } else {
          // Si no estaba en el array
          // Agrega todo el producto
          cartFound.products.push(data);
        }
      }

      let cart = await Cart.findByIdAndUpdate(
        cartId,
        {
          products: cartFound.products,
        },
        { new: true }
      );
      await Product.findByIdAndUpdate(data.pid, { stock });

      return { status: 200, cart }; // cart has been updated
    } catch (error) {
      console.log(error);
      return 500; // error: updating cart
    }
  }

  async deleteProducts(cartId, data) {
    try {
      let cartFound = await Cart.findById(cartId);
      let productFound = await Product.findById(data.pid);
      let productCart = cartFound.products.find(
        (prod) => String(prod.pid) === data.pid
      );

      if (!cartFound || !productFound || !productCart) {
        return 404;
      }

      let stock = productFound.stock;

      // Si las unidades a eliminar son menores a las unidades del carrito, se restan.
      // De lo contrario, las unidades del carrito pasarían a ser 0 y se elimina el producto del carrito.
      productCart.units > data.units
        ? ((productCart.units -= data.units), (stock += data.units))
        : ((stock += productCart.units),
          (cartFound = {
            ...cartFound,
            products: cartFound.products.filter(
              (prod) => String(prod.pid) !== data.pid
            ),
          }));

      let cart = await Cart.findByIdAndUpdate(
        cartId,
        {
          products: cartFound.products,
        },
        { new: true }
      );
      await Product.findByIdAndUpdate(data.pid, { stock });
      return { status: 200, cart };
    } catch (error) {
      console.log(error);
      return 500;
    }
  }
}

let cartManager = new CartManager();
export default cartManager;
