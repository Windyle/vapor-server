type BaseProduct = {
  name: string;
  description: string;
  price: number;
}

export type ProductForCreation = BaseProduct;

export type Product = BaseProduct & {
  id: number;
}

export type ProductData = {
  latestSequenceId: number;
  products: Product[];
}