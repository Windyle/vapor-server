import fs from "fs";
import type {
  Product,
  ProductData,
  ProductForCreation,
} from "../models/product";
import { logger } from "./utils/logger.service";

const DataPath = "./data/products.json";

export const ProductService = {
  getAllProducts: (): Product[] => {
    try {
      const data = JSON.parse(
        fs.readFileSync(DataPath, "utf-8")
      ) as ProductData;
      return data.products || [];
    } catch (error) {
      logger.error(error);
      return [];
    }
  },

  getProductById: (id: number): Product | null => {
    try {
      const data = JSON.parse(
        fs.readFileSync(DataPath, "utf-8")
      ) as ProductData;
      const product = data.products.find((p: Product) => p.id === id);
      return product || null;
    } catch (error) {
      logger.error(error);
      return null;
    }
  },

  createProduct: (body: ProductForCreation): Product | null => {
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

      return newProduct;
    } catch (error) {
      logger.error(error);
      return null;
    }
  },

  updateProduct: (id: number, body: ProductForCreation): Product | null => {
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
      return product;
    } catch (error) {
      logger.error(error);
      return null;
    }
  },

  deleteProduct: (id: number): Product | null => {
    try {
      const data = JSON.parse(
        fs.readFileSync(DataPath, "utf-8")
      ) as ProductData;
      const product = data.products.find((p: Product) => p.id === id);

      if (!product) {
        return null;
      }

      data.products = data.products.filter((p: Product) => p.id !== id);

      fs.writeFileSync(DataPath, JSON.stringify(data, null, 2));

      return product;
    } catch (error) {
      logger.error(error);
      return null;
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
