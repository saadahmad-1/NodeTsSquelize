import Product from "@src/models/Product";
import responses from "@src/constants/responses";

class ProductService {
  getProductServers = async ({
    providerId,
    productId,
    partnerId,
  }: any): Promise<any> => {
    const product: any = await Product.findOne({
      
      where: { providerId: providerId, id: productId },
    });
    if (!product) return { ...responses["100"](), data: null };
    return { ...responses["0"](), data: product };
  };

}

export default ProductService;
