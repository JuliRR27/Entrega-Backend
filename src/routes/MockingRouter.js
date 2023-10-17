import MainRouter from "./Router.js";
import generateProduct from "../utils/mocks/generateProduct.js";

class MockingRouter extends MainRouter {
	init() {
		this.get('/products', ['PUBLIC'], async (req, res) => {
			let products = [];
			for (let i = 0; i < 100; i++) {
				products.push(generateProduct());
			}
			res.send(products);
		});
		// this.get('/users', )
	}
}

export default new MockingRouter();