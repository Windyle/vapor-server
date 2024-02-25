import { Request, Response, NextFunction } from "express";
import { ProductValidationService } from "../services/product.service";

export const bodyValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  // Check for empty body or invalid body composition
  if (
    Object.keys(req.body).length === 0 ||
    !ProductValidationService.validateProductForCreation(req.body)
  ) {
    res.status(400).send();
    return;
  }

  next();
};
