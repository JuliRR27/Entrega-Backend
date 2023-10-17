import fs from "fs";

class CartManager {
  constructor(path) {
    this.carts = [];
    this.path = path;
    this.init(path);
  }

  init(path) {
    let file = fs.existsSync(path);
    if (!file) {
      fs.writeFileSync(path, "[]");
      return console.log("File created");
    } else {
      this.carts = JSON.parse(fs.readFileSync(path, "utf-8"));
      return console.log("Data recovered");
    }
  }

  getCarts() {
    return this.carts;
  }


  getCart(cartId) {
    return this.carts.find((cart) => cart.id === cartId);
  }

  async addCart() {
    try {
      let cart = { products: [] };
      if (this.carts.length > 0) {
        cart.id = this.carts.length + 1;
      } else {
        cart.id = 1;
      }
      this.carts.push(cart);
      let dataJson = JSON.stringify(this.carts, null, 2);
      await fs.promises.writeFile(this.path, dataJson);
      return 201;
    } catch (err) {
      return null;
    }
  }

  async addProducts(cartId, data) {
    try {
      let cartFound = this.getCartById(cartId);
      if (!cartFound) {
        return null;
      }

      if (
        Object.keys(data).length === 0 ||
        typeof data !== "object" ||
        data.units === 0
      ) {
        return null;
      }

      if (cartFound.products.length === 0) {
        cartFound.products.push(data);
      } else {
        let products = [];
        cartFound.products.forEach((product) => {
          products.push(product.pid);
        });

        if (products.includes(data.pid)) {
          let productToAddUnits = cartFound.products.find(
            (product) => product.pid === data.pid
          );
          productToAddUnits.units = productToAddUnits.units + data.units;
        } else {
          cartFound.products.push(data);
        }
      }
      let dataJson = JSON.stringify(this.carts, null, 2);
      await fs.promises.writeFile(this.path, dataJson);
      return 200;
    } catch (error) {
      return null;
    }
  }

  async deleteProducts(cartId, data) {
    try {
      let cartFound = this.getCartById(cartId);
      if (!cartFound) {
        return null;
      }

      let productInCart = false;
      let moreUnits = false;
      let newUnits;
      cartFound.products.forEach((product) => {
        if (product.pid === data.pid) {
          if (data.units >= product.units) {
            moreUnits = true;
            newUnits = product.units;
            cartFound.products = cartFound.products.filter(
              (product) => product.pid !== data.pid
            );
          } else {
            product.units = product.units - data.units;
          }
          productInCart = true;
        }
      });

      if (productInCart) {
        let dataJson = JSON.stringify(this.carts, null, 2);
        await fs.promises.writeFile(this.path, dataJson);
        if (moreUnits) {
          return newUnits;
        }
        return 200;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

// async function managment() {
//   let cartManager = new CartManager("./src/data/carts.json");
//   await cartManager.getCarts();
//   await cartManager.getCartById(3);
//   await cartManager.addCart({
//     products: [
//       { pid: 1, quantity: 2 },
//       { pid: 2, quantity: 2 },
//     ],
//   });
// }
// managment();

let cartManager = new CartManager("./src/data/carts.json");
export default cartManager;
