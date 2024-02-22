import express, { NextFunction, Request, Response } from 'express';
const router = express.Router();

import { ProductService } from '../services/product.service';
import { ProductValidationService } from '../services/product.service';

const bodyValidation = (req: Request, res: Response, next: NextFunction) => {
  // Check for empty body or invalid body composition
  if(Object.keys(req.body).length === 0 || !ProductValidationService.validateProductForCreation(req.body)) {
    res.status(400).send();
    return;
  }

  next();
}

const idParamValidation = (req: Request, res: Response, next: NextFunction) => {
  // Check for invalid id
  if(isNaN(Number(req.params.id))) {
    res.status(400).send();
    return;
  }

  next();
}

// GET /product -> returns all products
router.get('/', (req: Request, res: Response) => {
  res.send(ProductService.getAllProducts());
});

// GET /product/:id -> returns a product by id
router.get('/:id', idParamValidation, (req: Request, res: Response) => {
  res.send(ProductService.getProductById(parseInt(req.params.id)));
});

// POST /product -> creates a new product
router.post('/', bodyValidation, (req: Request, res: Response) => {
  res.send(ProductService.createProduct(req.body));
});

// PUT /product/:id -> updates a product by id
router.put('/:id', bodyValidation, idParamValidation, (req: Request, res: Response) => {
  res.send(ProductService.updateProduct(parseInt(req.params.id), req.body));
});

// DELETE /product/:id -> deletes a product by id
router.delete('/:id', idParamValidation, (req: Request, res: Response) => {
  res.send(ProductService.deleteProduct(parseInt(req.params.id)));
});

export const ProductRouter = router;