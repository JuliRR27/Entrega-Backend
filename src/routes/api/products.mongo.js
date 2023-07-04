import { Router } from "express";
import Product from "../../dao/models/Product.js";
import authenticateAdmin from "../../middlewares/authenticateAdmin.js";

const router = Router();

router.post("/", authenticateAdmin, async (req, res, next) => {
  try {
    console.log(req.session.email);
    let productData = req.body;
    let newProduct = await Product.create(productData);
    return res.status(201).json({
      success: true,
      message: `product "${newProduct._id}" created`,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    let page = req.query.page ?? 1;
    let limit = req.query.limit ?? 6;
    let name = req.query.name
      ? new RegExp(req.query.name, "i")
      : new RegExp("");
    let products = await Product.paginate({ name }, { limit, page });
    if (products) {
      return res.status(200).json({
        success: true,
        response: products,
      });
    } else {
      return res.status(400).json({
        success: false,
        response: "Not found",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  let id = req.params.id;
  let product = await Product.findById(id);
  if (product) {
    return res.status(200).json({
      success: true,
      response: product,
    });
  } else {
    return res.status(400).json({
      success: false,
      response: "Not found",
    });
  }
});

router.put("/:id", async (req, res, next) => {
  let id = req.params.id;
  let productData = req.body;
  let response;
  if (Object.entries(productData).length !== 0) {
    let product = await Product.findByIdAndUpdate(id, productData, {
      new: true,
    });
    if (product) {
      response = product;
    } else {
      return res.status(400).json({
        success: false,
        response: "Product not found",
      });
    }
  } else {
    response = "There's nothing to update";
  }
  return res.status(200).json({
    success: true,
    response: response,
  });
});

router.delete("/:id", async (req, res, next) => {
  let id = req.params.id;
  let product = await Product.findByIdAndDelete(id);
  if (product) {
    return res.status(200).json({
      success: true,
      response: `Product "${product._id}" deleted`,
    });
  } else {
    return res.status(400).json({
      success: false,
      response: "Product not found",
    });
  }
});

export default router;
