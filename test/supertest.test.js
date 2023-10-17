import chai from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Test DecorateMe", () => {
  describe("Test Product Router", () => {
    it("El endpoint GET '/api/products' debe regresar todos los productos en forma de arreay", async () => {
      const { statusCode, ok, _body } = await requester.get("/api/products");
      expect(statusCode).to.be.eql(200);
      expect(ok).to.be.ok;
      expect(Array.isArray(_body.response.products.docs)).to.be.true;
    });
    it("El endpoint GET '/api/products/:pid' debe regresar un producto con el tipo objeto", async () => {
      const { statusCode, ok, _body } = await requester.get(
        "/api/products/64fc90c52467f201a2cbba88"
      );
      expect(statusCode).to.be.eql(200);
      expect(ok).to.be.ok;
      expect(typeof _body.response.product).to.equal("object");
    });
    it("El endpoint POST '/api/products' debe crear un producto", async () => {
      const productMock = {
        name: "Producto de Prueba",
        description: "Descripción",
        category: "Art",
        price: 5,
        thumbnail: "URL",
      };
      const { statusCode, ok, _body } = await requester
        .post("/api/products")
        .send(productMock);
      expect(statusCode).to.be.eql(201);
      expect(ok).to.be.ok;
      expect(_body.response.response).to.have.property("_id");
      expect(typeof _body.response.response).to.equal("object");
    });
  });
  //   describe("Test Cart Router", () => {
  //     it("Primer test", async () => {
  //       console.log("Primer test");
  //     });
  //   });
  //   describe("Test Sessions Router", () => {
  //     it("Primer test", async () => {
  //       console.log("Primer test");
  //     });
  //   });
});
