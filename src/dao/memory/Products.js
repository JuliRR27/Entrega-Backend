import fs from 'fs'

export class ProductManager {
  constructor(path) {
    this.path = path
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, 'utf-8')
        return products ? JSON.parse(products) : "Not found"
      }
      return []
    } catch (error) {
      return 'getProducts: error'
    }
  }
  
  async addProduct(title, description, price, thumbnail, stock = 0) {

    try {
      let fileProducts = await this.getProducts() // Traigo los productos del archivo
      typeof fileProducts === 'string' && (fileProducts = [])
      // Genero el producto y lo pusheo a fileProducts

      const id = fileProducts.length === 0 ? 1 : fileProducts[fileProducts.length - 1].id + 1; // Si el lenght === 0, id = 1, de lo contrario tomo el id del último producto del array y le sumo 1
      let product = { id, title, description, price, thumbnail, stock }
      fileProducts.push(product)

      // Serializo el array y lo escribo en el archivo

      const data = JSON.stringify(fileProducts, null, 2)
      await fs.promises.writeFile(this.path, data)

      return `Product created successfully. ID: ${id}`
    } catch (error) {
      return 'addProduct: error'
    }
  }

  async getProductById(id) {
    try {
      const fileProducts = await this.getProducts()
      let productFound = fileProducts.find(prod => prod.id === id)
      return productFound !== undefined ? productFound : 'Product not found'
    } catch (error) {
      return 'getProducts: error'
    }
  }

  async deleteProduct(id) {
    try {
      if (typeof await this.getProductById(id) === 'object') {
        const fileProducts = await this.getProducts()
        const remainingProducts = fileProducts.filter(prod => prod.id !== id)
        await fs.promises.writeFile(this.path, JSON.stringify(remainingProducts, null, 2))
        return 'Product deleted successfully'
      }
      return 'Product not found'
    } catch (error) {
      return 'deleteProduct: error'
    }
  }

  async updateProduct(id, data) {
    try {
      const product = await this.getProductById(id)
      if (typeof product === 'object') {
        const modifiedProduct = { ...product, ...data, id: id } // Creo un nuevo objeto con todas las propiedades del original y le agrego las de data. También reescribo el id para evitar que en data se pueda modificar.

        // Elimino el producto antiguo del archivo y agrego el modificado
        await this.deleteProduct(id)

        let fileProducts = await this.getProducts()
        fileProducts.push(modifiedProduct)
        const stringifyProducts = JSON.stringify(fileProducts, null, 2)
        await fs.promises.writeFile(this.path, stringifyProducts)

        return 'Product modified successfully'
      }
      return `No products found with ID ${id}`
    } catch (error) {
      return 'updateProduct: error'
    }
  }
}

export const store = new ProductManager('./src/data/products.json')

// const test = async () => {
//   console.log(await store.addProduct('té', 'hoja en sobre', 8, 'sin imágen'))
//   console.log(await store.addProduct('café', 'cafeína líquida', 12, 'sin imágen', 10))
//   console.log(await store.addProduct('coca-cola', 'cafeína y azúcar', 20, 'sin imágen', 15))
//   console.log(await store.addProduct('agua', 'agua', 10, 'sin imágen', 20))
//   console.log(await store.addProduct('libreta', 'libreta', 30, 'sin imágen', 15))
//   console.log(await store.addProduct('lapicera', 'lapicera', 10, 'sin imágen', 22))
//   console.log(await store.addProduct('auriculares', 'auriculares', 39, 'sin imágen', 3))
//   console.log(await store.addProduct('cargador', 'cargador', 23, 'sin imágen'))
//   console.log(await store.addProduct('marcalibros', 'marcalibros', 2, 'sin imágen'))
//   console.log(await store.addProduct('teclado', 'teclado', 49, 'sin imágen'))
// console.log(await store.getProductById(9))
// console.log(await store.updateProduct(9, {title: "ml", id:20}))
// console.log(await store.deleteProduct(10))
// console.log(await store.getProducts())
// }

// test()
