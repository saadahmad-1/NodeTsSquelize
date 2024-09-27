import { NextFunction, Response, Request } from "express";
import ProductService from "@src/services/ProductService";

const productService = new ProductService();

export const getProductServers = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { providerId, productId } = req.query;
    const { partner } = req;
    let resp = await productService.getProductServers({
      providerId,
      productId,
      partnerId: partner.id,
    });
    return res.status(200).json(resp);
  } catch (err) {
    next(err);
  }
};
