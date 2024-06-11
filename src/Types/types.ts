// types/product.ts

export type Product = {
  name: string;
  description: string;
  price: number;
  image?: any;
  discount: number;
  quantity: number;
  warehouse: string;
  category: string;
  brand?: string;
  sku: string;
  id: number;
  color?: string;
};
