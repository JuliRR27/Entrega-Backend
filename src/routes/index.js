import { Router } from "express";
import api_router from "./api/api-index.js";

const router = Router();

router.use("/api", api_router);

export default router;
