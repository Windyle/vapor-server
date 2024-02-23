import { Request, Response, NextFunction } from "express";

export const idParamValidation = (req: Request, res: Response, next: NextFunction) => {
  // Check for invalid id
  if (isNaN(Number(req.params.id))) {
    res.status(400).send();
    return;
  }

  next();
};