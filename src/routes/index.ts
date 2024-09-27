import { Router } from "express";
import productRoutes from "./product.route";
import imageRoutes from "./image.route";

const router = Router();

router.use("/product", productRoutes);
router.use("/image", imageRoutes);

export default router;
