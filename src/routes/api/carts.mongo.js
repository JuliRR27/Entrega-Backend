import { Router } from "express";
import Cart from "../../dao/models/Cart.js";
import cartManager from "../../dao/managers/Cart.mongo.js";
import { Types } from "mongoose";

const router = Router();

// GET CARTS
router.get("/", async (req, res, next) => {
  try {
    let carts = await Cart.aggregate([
      {
        $lookup: {
          from: "products", // Colección
          localField: "products.pid", // Campo de la colección
          foreignField: "_id", // Campo de la colección que debo buscar
          as: "productsPopulated", // Nombre
        },
      },
      {
        $unwind: {
          path: "$productsPopulated",
          preserveNullAndEmptyArrays: true,
        },
      }, // Desagrega el arreglo del lookup, y agrega aquellos que están vacíos
      { $sort: { "productsPopulated.name": 1 } },
      {
        $group: {
          _id: "$_id",
          products: {
            $push: {
              pid: "$productsPopulated",
              units: {
                $arrayElemAt: [
                  "$products.units",
                  {
                    $indexOfArray: ["$products.pid", "$productsPopulated._id"],
                  },
                ],
              },
            },
          },
        },
      },
    ]);
    if (carts.length > 0) {
      return res.status(200).json({ success: true, response: carts });
    }
    return res
      .status(400)
      .json({ success: false, response: "carts not found" });
  } catch (error) {
    next(error);
  }
});

// GET CART BY ID
router.get("/:cid", async (req, res, next) => {
  try {
    let id = req.params.cid;
    let cart = await Cart.findById(id);
    if (cart) {
      return res.status(200).json({ success: true, response: cart });
    }
    return res.status(400).json({ success: false, response: "cart not found" });
  } catch (error) {
    next(error);
  }
});

// GET BILL FROM ONE CART
router.get("/bills/:cid", async (req, res, next) => {
  try {
    let id = req.params.cid;
    let cart = await Cart.aggregate([
      { $match: { _id: new Types.ObjectId(id) } }, // filtro por id carrito
      { $unwind: "$products" },
      {
        $lookup: {
          from: "products",
          localField: "products.pid",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $project: {
          _id: 0,
          total: {
            $multiply: ["$products.units", "$product.price"],
          },
        },
      },
      { $group: { _id: null, total: { $sum: "$total" } } },
    ]);
    if (cart) {
      return res.status(200).json({ success: true, response: cart });
    }
    return res.status(404).json({ success: false, response: "Cart not found" });
  } catch (error) {
    next(error);
  }
});

// // CREATE EMPTY CART
// router.post("/", async (req, res, next) => {
//   try {
//     let cart = await Cart.create({ products: [] });
//     return res
//       .status(201)
//       .json({ success: true, response: `cart created with ID ${cart._id}` });
//   } catch (error) {
//     next(error);
//   }
// });

// UPDATE CART (ADD UNITS FROM PRODUCT(ID) TO CART(ID))
router.put("/:cid/product/:pid/:units", async (req, res, next) => {
  try {
    let cartId = req.params.cid;
    let productId = req.params.pid;
    let productUnits = Number(req.params.units);

    let response = await cartManager.addProducts(cartId, {
      pid: productId,
      units: productUnits,
    });

    if (response.status === 200) {
      return res.status(200).json({ success: true, response: response.cart });
    } else if (response === 404) {
      return res
        .status(404)
        .json({ success: false, response: `Cart (${cartId}) not found` });
    } else if (response === 400) {
      return res
        .status(400)
        .json({ success: false, response: "Data required" });
    } else if (response === 500) {
      return res
        .status(500)
        .json({ success: false, response: "Internal server error" });
    }
  } catch (error) {
    next(error);
  }
});

// DELETE CART PRODUCT (DELETE PRODUCT(ID) UNITS FROM CART(ID))
router.delete("/:cid/product/:pid/:units", async (req, res, next) => {
  try {
    let cartId = req.params.cid;
    let productId = req.params.pid;
    let productUnits = Number(req.params.units);

    let response = await cartManager.deleteProducts(cartId, {
      pid: productId,
      units: productUnits,
    });

    if (response.status === 200) {
      return res.status(200).json({ success: true, response: response.cart });
    } else if (response === 404) {
      return res.status(404).json({ success: false, response: "Check ids" });
    } else if (response === 500) {
      return res
        .status(500)
        .json({ success: false, response: "Internal server error" });
    }

    return res.json({ status: 400, response: "product(s) not deleted" });
  } catch (error) {
    next(error);
  }
});

// DELETE CART
// router.delete("/:cid", async(req,res,next) => {
//   try {

//   } catch (error) {
//     next(error)
//   }
// })

export default router;
