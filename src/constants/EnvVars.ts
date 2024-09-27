import path from "path";
import dotenv from "dotenv";

const result2 = dotenv.config({
  path: path.join(__dirname, `../../.env`),
});
if (result2.error) {
  throw result2.error;
}

const { env } = process;

// const CODASHOP_SERVICE_APIS: any = env.CODASHOP_SERVICE_APIS;

// let CODASHOP_SERVICE_END_POINTS: object = JSON.parse(CODASHOP_SERVICE_APIS);

export const codaShopConfigs: any = {
  methods: {
    listSku: env.CODASHOP_METHOD_LIST_SKU,
    validate: env.CODASHOP_METHOD_VALIDATE,
    listServer: env.CODASHOP_METHOD_LIST_SERVER,
    topUp: env.CODASHOP_METHOD_TOP_UP,
    placeOrder: env.CODASHOP_PLACE_ORDER,
  },
  endPoints: {
    listAllProducts: env.CODASHOP_SERVICE_APIS_listAllProducts,
    listAllProductSKUs: env.CODASHOP_SERVICE_APIS_listProductSKUs,
  },
  supportedCountries: [586],
  providerId: env.CODASHOP_PROVIDER_ID,
};

export const knectServiceConfigs: any = {
  baseUrl: env.KNECT_BASE_URL,
  endPoints: {
    verifyOneTimeTransaction: env.KENCT_SERVICE_APIS_verifyOneTimeTransactions,
  },
};
export const waleeConfigs: any = {
  endPoints: {
    voucherList: env.WALEE_VOUCHER_LIST,
    voucherDetails: env.WALEE_VOUCHER_DETAILS,
    voucherPurchase: env.WALEE_VOUCHER_PURCHASE,
  },
  providerId: env.WALEE_PROVIDER_ID,
};

export default {
  SECRET_KEY: env.SECRET_KEY ?? "",
  NodeEnv: env.NODE_ENV ?? "",
  Port: env.PORT ?? 0,
  DB: {
    DATABASE: env.DATABASE ?? "VP_Service",
    HOST: env.DB_HOST ?? "127.0.0.1",
    PORT: env.DB_PORT ?? "3606",
    USERNAME: env.DB_USERNAME ?? "root",
    PASSWORD: env.DB_PASSWORD ?? "root",
    READER_HOST: env.DB_READER_HOST ?? "127.0.0.1",
  },
} as const;
