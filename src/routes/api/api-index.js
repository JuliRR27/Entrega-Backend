import { Router } from "express";
import products_router from "./products.mongo.js";
import cart_router from "./carts.mongo.js";
import auth_router from "./auth.js";

const router = Router();

router.use("/products", products_router);
router.use("/cart", cart_router);
router.use('/auth', auth_router)

export default router;
