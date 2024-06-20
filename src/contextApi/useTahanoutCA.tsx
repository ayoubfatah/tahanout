import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { CustomersType, Product } from "../Types/types";

interface TahanoutContextType {
  customerOptions: CustomersType | null;
  setCustomerOptions: React.Dispatch<
    React.SetStateAction<CustomersType | null>
  >;
  productOptions: Product | null;
  setProductOptions: React.Dispatch<React.SetStateAction<Product | null>>;
  paymentMethod: any;
  setPaymentMethod: React.Dispatch<React.SetStateAction<any>>;
}

interface TahanoutProvider {
  children: ReactNode;
}

const DarkModeContext = createContext<TahanoutContextType | null>(null);

const TahanoutProvider: React.FC<TahanoutProvider> = ({ children }) => {
  const [productOptions, setProductOptions] = useState<Product | null>(null);
  const [customerOptions, setCustomerOptions] = useState<CustomersType | null>(
    null
  );
  const [paymentMethod, setPaymentMethod] = useState(null);

  // values

  const contextValue: TahanoutContextType = {
    customerOptions,
    setCustomerOptions,
    productOptions,
    setProductOptions,
    paymentMethod,
    setPaymentMethod,
  };

  return (
    <DarkModeContext.Provider value={contextValue}>
      {children}
    </DarkModeContext.Provider>
  );
};

const useTahanout = (): TahanoutContextType => {
  const context = useContext(DarkModeContext);
  if (context === null) {
    throw new Error("useTahanout must be used within a DarkModeProvider");
  }
  return context;
};

export { TahanoutProvider, useTahanout };
