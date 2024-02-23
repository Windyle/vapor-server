import express, { Request, Response } from "express";
const router = express.Router();

import { bodyValidation } from "../middleware/body-validation.middleware";
import { idParamValidation } from "../middleware/params-validation.middleware";
import { ProductService } from "../services/product.service";
import { DefaultHttpResponse } from "../types/default-http-response";
import { Product } from "../models/product";

// GET /product -> returns all products
router.get("/", (req: Request, res: Response) => {
  const response: DefaultHttpResponse<Product[]> = ProductService.getAllProducts();

  res.status(response.statusCode).send(response);
});

// GET /product/:id -> returns a product by id
router.get("/:id", idParamValidation, (req: Request, res: Response) => {
  const response: DefaultHttpResponse<Product | null> = ProductService.getProductById(
    parseInt(req.params.id)
  );

  res.status(response.statusCode).send(response);
});

// POST /product -> creates a new product
router.post("/", bodyValidation, (req: Request, res: Response) => {
  const response: DefaultHttpResponse<Product | null> = ProductService.createProduct(
    req.body
  );

  res.status(response.statusCode).send(response);
});

// PUT /product/:id -> updates a product by id
router.put(
  "/:id",
  bodyValidation,
  idParamValidation,
  (req: Request, res: Response) => {
    const response: DefaultHttpResponse<Product | null> = ProductService.updateProduct(
      parseInt(req.params.id),
      req.body
    );

    res
      .status(response.statusCode)
      .send(response);
  }
);

// DELETE /product/:id -> deletes a product by id
router.delete("/:id", idParamValidation, (req: Request, res: Response) => {
  const response: DefaultHttpResponse<Product | null> = ProductService.deleteProduct(
    parseInt(req.params.id)
  );

  res.status(response.statusCode).send(response);
});

export const ProductRouter = router;
