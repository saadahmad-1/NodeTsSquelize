import { Router } from "express";
import * as productControllers from "@src/controllers/product.controller";
import { validate, ValidationType } from "@src/middlewares/validator";
import {
  getProductServers,
} from "@src/constants/schemaValidations";
const router = Router();

router.get(
  "/v1/getProductServers",
  validate(getProductServers, ValidationType.Query),
  productControllers.getProductServers
);

export default router;
