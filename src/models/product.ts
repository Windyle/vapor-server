type BaseProduct = {
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
};

export type ProductForCreation = BaseProduct;

export type Product = BaseProduct & {
  id: number;
};

export type ProductData = {
  latestSequenceId: number;
  products: Product[];
};
