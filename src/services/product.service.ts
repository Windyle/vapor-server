import fs from "fs";
import type {
  Product,
  ProductData,
  ProductForCreation,
} from "../models/product";
import { logger } from "./utils/logger.service";
import { DefaultHttpResponse } from "../types/default-http-response";

const DataPath = "./data/products.json";

export const ProductService = {
  getAllProducts: (): DefaultHttpResponse<Product[]> => {
    try {
      const data = JSON.parse(
        fs.readFileSync(DataPath, "utf-8")
      ) as ProductData;
      
      return {
        statusCode: 200,
        data: data.products,
      };
    } catch (error) {
      logger.error(error);
      
      return {
        statusCode: 500,
        data: [],
        message: "Internal server error",
      };
    }
  },

  getProductById: (id: number): DefaultHttpResponse<Product | null> => {
    try {
      const data = JSON.parse(
        fs.readFileSync(DataPath, "utf-8")
      ) as ProductData;
      const product = data.products.find((p: Product) => p.id === id);
      
      if (!product) {
        return {
          statusCode: 404,
          data: null,
          message: "Product not found",
        };
      }

      return {
        statusCode: 200,
        data: product,
      };
    } catch (error) {
      logger.error(error);
      
      return {
        statusCode: 500,
        data: null,
        message: "Internal server error",
      };
    }
  },

  createProduct: (body: ProductForCreation): DefaultHttpResponse<Product | null> => {
    try {
      const { name, description, price, imageUrl } = body;

      const data = JSON.parse(
        fs.readFileSync(DataPath, "utf-8")
      ) as ProductData;
      const newProduct: Product = {
        id: data.latestSequenceId + 1,
        name,
        description,
        price,
        imageUrl,
      };

      data.products = [...data.products, newProduct];
      data.latestSequenceId = newProduct.id;

      fs.writeFileSync(DataPath, JSON.stringify(data, null, 2));

      return {
        statusCode: 201,
        data: newProduct,
      };
    } catch (error) {
      logger.error(error);
      
      return {
        statusCode: 500,
        data: null,
        message: "Internal server error",
      };
    }
  },

  updateProduct: (id: number, body: ProductForCreation): DefaultHttpResponse<Product | null> => {
    try {
      const { name, description, price, imageUrl } = body;

      const data = JSON.parse(
        fs.readFileSync(DataPath, "utf-8")
      ) as ProductData;
      const product = data.products.find((p: Product) => p.id === id);

      if (!product) {
        throw new Error("Product not found");
      }

      data.products[data.products.indexOf(product)] = {
        ...product,
        name,
        description,
        price,
        imageUrl,
      };

      fs.writeFileSync(DataPath, JSON.stringify(data, null, 2));
      
      return {
        statusCode: 200,
        data: data.products[data.products.indexOf(product)],
      };
    } catch (error) {
      logger.error(error);
      
      return {
        statusCode: 500,
        data: null,
        message: "Internal server error",
      };
    }
  },

  deleteProduct: (id: number): DefaultHttpResponse<Product | null> => {
    try {
      const data = JSON.parse(
        fs.readFileSync(DataPath, "utf-8")
      ) as ProductData;
      const product = data.products.find((p: Product) => p.id === id);

      if (!product) {
        return {
          statusCode: 404,
          data: null,
          message: "Product not found",
        };
      }

      data.products = data.products.filter((p: Product) => p.id !== id);

      fs.writeFileSync(DataPath, JSON.stringify(data, null, 2));

      return {
        statusCode: 200,
        data: product,
      };
    } catch (error) {
      logger.error(error);
      
      return {
        statusCode: 500,
        data: null,
        message: "Internal server error",
      };
    }
  },
};

export const ProductValidationService = {
  validateProductForCreation: (body: ProductForCreation): boolean => {
    try {
      const { name, description, price, imageUrl } = body;

      if (
        !name ||
        !price ||
        isNaN(Number(price)) ||
        description === undefined ||
        imageUrl === undefined
      ) {
        return false;
      }

      return true;
    } catch (error) {
      logger.error(error);
      return false;
    }
  },
};
