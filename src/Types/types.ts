// types/product.ts

export type Product = {
  name: string;
  description: string;
  price: number;
  images?: string[];
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
  createdAt?: string | Date;
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
  nationalId: string;
};

export type ButtonType = {
  icon?: React.ReactNode;
  iconColor?: string;
  hoverColor?: string;
  onClick: () => void;
  text: string;
  textColor: string;
  bgColor: string;
  disabled?: boolean;
  borderColor?: string;
  border?: string;
  type?: any;
};
export type OrderType = {
  id: number;
  customerId: number;
  productId: number;
  status: string;
  shippingCost: number;
  totalPrice: number;
  productPrice: number;
  paymentMethod: string;
  quantity: number;
  customerName: string;
  customers?: CustomersType;
  createdAt?: string | Date;
};

export type OrderStatusTypes =
  | "canceled"
  | "in-progress"
  | "delivered"
  | "returned"
  | "pending";

export type loginType = {
  email: string;
  password: string;
};

export type EmployeesType = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  createdAt?: string | Date;
  status: "online" | "offline";
  avatar?: string;
};
