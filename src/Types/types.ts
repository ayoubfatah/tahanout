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
  colors?: string;
  minOrder: number;
  weight: number;
  additional_images?: string;
  created_at?: string | Date;
  imgDetails?: any;
};

export type ChildrenType = {
  children: React.ReactNode;
};

export type CustomersType = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  country: string;
  city: string;
  zipCode: string;
  address: string;
};

export type ButtonType = {
  onClick: () => void;
  text: string;
  textColor: string;
  bgColor: string;
  disabled?: boolean;
  borderColor?: string;
  border?: string; 
};
